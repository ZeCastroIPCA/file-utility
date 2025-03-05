<script lang="ts">
	import { compressImage } from '$lib/utils/imageCompression'
	import { processVideo } from '$lib/utils/videoCompression'
	import { processAudio } from '$lib/utils/audioCompression'

	let file: File | null = null
	let compressedFile: Blob | null = null
	let compressionType: 'image' | 'video' | 'audio' | null = null
	let compressionPercentage: number = 50
	let loading: boolean = false

	async function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement
		file = input.files?.[0] || null
		compressedFile = null
		loading = false
	}

	async function compress() {
		if (!file || !compressionType) return

		loading = true

		try {
			switch (compressionType) {
				case 'image':
					compressedFile = await compressImage(file, compressionPercentage)
					break
				case 'video':
					compressedFile = await processVideo(file)
					break
				case 'audio':
					compressedFile = await processAudio(file)
					break
			}
		} catch (error) {
			console.error('Processing error:', error)
		} finally {
			loading = false
		}
	}

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

	<div class="file-type-select">
		<label>
			<input type="radio" value="image" bind:group={compressionType} />
			Image (Compression Supported)
		</label>
		<label>
			<input type="radio" value="video" bind:group={compressionType} />
			Video (Not Supported)
		</label>
		<label>
			<input type="radio" value="audio" bind:group={compressionType} />
			Audio (Not Supported)
		</label>
	</div>

	<div class="file-upload">
		<input type="file" id="file-input" on:change={handleFileChange} />
		<label for="file-input">Choose a file</label>
		{#if file}
			<p class="file-name">{file.name}</p>
		{/if}
	</div>

	{#if file}
		<div class="compression-percentage">
			<label for="compression-percentage">Compression Percentage: {compressionPercentage}%</label>
			<input type="range" id="compression-percentage" min="0" max="100" bind:value={compressionPercentage} />
		</div>
		<button on:click={compress} disabled={loading}>Compress</button>
	{/if}

	{#if loading}
		<div class="loading-animation">Compressing...</div>
	{/if}

	{#if compressedFile}
		<p>Your file is compressed!</p>
		<button on:click={downloadFile}>Download</button>
	{/if}
</div>

<style>
	.compress-section {
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

	.file-type-select {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		justify-content: center; /* Center radio buttons */
	}

	label {
		color: #625b71;
		font-weight: 600; /* Slightly bolder labels */
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

	.compression-percentage {
		margin-bottom: 1rem;
	}

	input[type='range'] {
		width: 100%;
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
