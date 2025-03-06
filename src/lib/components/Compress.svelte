<script lang="ts">
    import { compressImage } from '$lib/utils/imageCompression'

    let file: File | null = null
    let compressedFile: Blob | null = null
    let compressionPercentage: number = 50
    let loading: boolean = false
    let errorMessage: string | null = null

    // Handle file input change
    async function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement
        file = input.files?.[0] || null
        compressedFile = null
        errorMessage = null

        if (file && !file.type.startsWith('image/')) {
            errorMessage = 'Please select a valid image file.'
            file = null
        }
    }

    // Compress the selected file
    async function compress() {
        if (!file) return

        loading = true

        try {
            compressedFile = await compressImage(file, compressionPercentage)
        } catch (error) {
            console.error('Processing error:', error)
            errorMessage = 'An error occurred during compression.'
        } finally {
            loading = false
        }
    }

    // Download the compressed file
    function downloadFile() {
        if (!compressedFile) return

        const url = URL.createObjectURL(compressedFile)
        const a = document.createElement('a')
		a.href = url
        a.download = `compressed-${file?.name || 'file'}`
        a.click()
        URL.revokeObjectURL(url)
    }
</script>

<div class="compress-section">
    <h2>Compress</h2>

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
        <div class="compression-percentage">
            <label for="compression-percentage">Compression Percentage: {compressionPercentage}%</label>
            <input
                type="range"
                id="compression-percentage"
                min="1"
                max="99"
                bind:value={compressionPercentage}
            />
        </div>
        <button on:click={compress} disabled={loading}>Compress</button>
    {/if}

    {#if loading}
        <div class="loading-animation">Compressing...</div>
    {/if}

    {#if compressedFile && !loading}
        <p>Your file is compressed!</p>
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

    .compress-section {
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

    .compression-percentage {
        margin-bottom: 1rem;
    }

    input[type='range'] {
        width: 100%;
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