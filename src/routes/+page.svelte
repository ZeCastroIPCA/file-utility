<script lang="ts">
	import Compress from '$lib/components/Compress.svelte'
	import Convert from '$lib/components/Convert.svelte'

	let show = 0
</script>

<div class="container">
	<h1>COMPRESS or CONVERT</h1>
	<p>almost any file type for free</p>

	<div class="buttons">
		<button class="compress-btn" on:click={() => (show = 1)}> ← COMPRESS </button>
		<button class="convert-btn" on:click={() => (show = 2)}> CONVERT → </button>
	</div>

	{#if show === 1}
		<Compress />
	{/if}

	{#if show === 2}
		<Convert />
	{/if}
</div>

<style>
	:root {
		--primary-color: #6750a4;
		--primary-color-hover: #5c4593;
		--background-color: #f5f5f5;
		--text-color: #333333;
		--muted-text-color: #625b71;
	}

	.container {
		font-family: 'Inter', sans-serif;
		background-color: var(--background-color);
		border-radius: 12px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
		padding: 2rem;
		max-width: 600px;
		margin: 2rem auto;
		text-align: center;
	}

	h1 {
		color: var(--text-color);
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	p {
		color: var(--muted-text-color);
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}

	.buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
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
</style>
