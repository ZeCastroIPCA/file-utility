<script lang="ts">
    let file: File | null = null;
    let convertedFile: Blob | null = null;
    let loading: boolean = false;
    let outputFormat: 'jpg' | 'jpeg' | 'png' | 'webp' = 'jpeg';

    export let onClose: () => void;

    async function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        file = input.files?.[0] || null;
        convertedFile = null;
    }

    async function convert() {
        if (!file) return;

        loading = true;

        try {
            const image = await loadImage(file);
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
        } catch (error) {
            console.error('Conversion error:', error);
        } finally {
            loading = false;
        }
    }

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
    </div>

    {#if file}
        <div class="output-format">
            <label for="output-format">Output Format:</label>
            <select id="output-format" bind:value={outputFormat}>
				<option value="jpg">JPG</option>
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
    .convert-section {
        background-color: white;
        border: 1px solid #eeeeee;
        border-radius: 8px;
        padding: 1.5rem;
        margin-top: 2rem;
    }

    h2 {
        color: #333333;
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
        background-color: #6750a4; /* Primary purple */
        color: white;
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s ease;
    }

    .file-upload label:hover {
        background-color: #5c4593; /* Slightly darker on hover */
    }

    .file-name {
        margin-top: 0.5rem;
        color: #333333;
        font-size: 1rem;
        text-align: center;
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
        color: #333333;
    }

    .output-format select {
        padding: 0.5rem;
        border-radius: 8px;
        border: 1px solid #cccccc;
        font-size: 1rem;
        color: #333333;
        background-color: white;
        cursor: pointer;
        transition: border-color 0.2s ease;
    }

    .output-format select:focus {
        border-color: #6750a4; /* Primary purple */
        outline: none;
    }

    button {
        background-color: #6750a4; /* Primary purple */
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
        background-color: #5c4593; /* Slightly darker on hover */
    }

    button:disabled {
        background-color: #ccc; /* Disabled button color */
        cursor: not-allowed;
    }

    .loading-animation {
        margin-top: 1rem;
        font-size: 1.2rem;
        color: #6750a4;
    }
</style>
