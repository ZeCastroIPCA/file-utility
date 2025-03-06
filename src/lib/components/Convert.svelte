<script lang="ts">
    let file: File | null = null;
    let convertedFile: Blob | null = null;
    let loading: boolean = false;
    let outputFormat: 'jpeg' | 'png' | 'webp' = 'jpeg';
    let errorMessage: string | null = null;

    // Handle file input change
    async function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        file = input.files?.[0] || null;
        convertedFile = null;
        errorMessage = null;

        if (file && !file.type.startsWith('image/')) {
            errorMessage = 'Please select a valid image file.';
            file = null;
        }
    }

    // Convert the selected file
    async function convert() {
        if (!file) return;

        loading = true;

        try {
            await convertImage();
        } catch (error) {
            console.error('Conversion error:', error);
            errorMessage = 'An error occurred during conversion.';
        } finally {
            loading = false;
        }
    }

    // Convert image to the selected format
    async function convertImage() {
        const image = await loadImage(file!);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) throw new Error('Failed to get canvas context');

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const dataUrl = canvas.toDataURL(`image/${outputFormat}`);
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        convertedFile = blob;
    }

    // Load image from file
    function loadImage(file: File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = event.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Download the converted file
    function downloadFile() {
        if (!convertedFile) return;

        const url = URL.createObjectURL(convertedFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted-${file?.name || 'file'}.${outputFormat}`;
        a.click();
        URL.revokeObjectURL(url);
    }
</script>

<div class="convert-section">
    <h2>Convert</h2>

    <div class="file-upload">
        <input type="file" id="file-input" on:change={handleFileChange} />
        <label for="file-input">Choose a file</label>
        {#if file}
            <p class="file-name">{file.name}</p>
        {/if}
        {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
        {/if}
    </div>

    {#if file}
        <div class="output-format">
            <label for="output-format">Output Format:</label>
            <select id="output-format" bind:value={outputFormat}>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
            </select>
        </div>
        <button on:click={convert} disabled={loading}>Convert</button>
    {/if}

    {#if loading}
        <div class="loading-animation">Converting...</div>
    {/if}

    {#if convertedFile && !loading}
        <p>Your file is converted!</p>
        <button on:click={downloadFile}>Download</button>
    {/if}
</div>

<style>
    :root {
        --primary-color: #6750a4;
        --primary-color-hover: #5c4593;
        --background-color: white;
        --border-color: #eeeeee;
        --text-color: #333333;
        --label-color: #625b71;
        --disabled-color: #ccc;
        --loading-color: #6750a4;
        --error-color: #ff0000;
    }

    .convert-section {
        background-color: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1.5rem;
        margin-top: 2rem;
    }

    h2 {
        color: var(--text-color);
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .file-upload {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
    }

    .file-upload input[type='file'] {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }

    .file-upload label {
        display: block;
        width: 100%;
        padding: 1rem 0;
        background-color: var(--primary-color);
        color: white;
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s ease;
    }

    .file-upload label:hover {
        background-color: var(--primary-color-hover);
    }

    .file-name {
        margin-top: 0.5rem;
        color: var(--text-color);
        font-size: 1rem;
        text-align: center;
    }

    .error-message {
        color: var(--error-color);
        font-size: 1rem;
        text-align: center;
        margin-top: 0.5rem;
    }

    .output-format {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .output-format label {
        margin-right: 0.5rem;
        font-weight: 600;
        color: var(--text-color);
    }

    .output-format select {
        padding: 0.5rem;
        border-radius: 8px;
        border: 1px solid #cccccc;
        font-size: 1rem;
        color: var(--text-color);
        background-color: white;
        cursor: pointer;
        transition: border-color 0.2s ease;
    }

    .output-format select:focus {
        border-color: var(--primary-color);
        outline: none;
    }

    button {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 8px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.2s ease;
    }

    button:hover {
        background-color: var(--primary-color-hover);
    }

    button:disabled {
        background-color: var(--disabled-color);
        cursor: not-allowed;
    }

    .loading-animation {
        margin-top: 1rem;
        font-size: 1.2rem;
        color: var(--loading-color);
    }
</style>