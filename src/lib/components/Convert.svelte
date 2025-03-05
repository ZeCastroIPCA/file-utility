<script lang="ts">
	// Implement conversion logic here (e.g., using libraries like ffmpeg.wasm)
	// This requires more complex client-side processing, which might not be feasible for all formats.
	// ... (placeholder for now)

	export let onClose: () => void
</script>

<div class="convert-section">
	<h2>Convert</h2>
	<p>Conversion functionality not yet implemented.</p>
	<button on:click={onClose}>Close</button>
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

	label {
		color: #625b71;
		font-weight: 600; /* Slightly bolder labels */
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
</style>
