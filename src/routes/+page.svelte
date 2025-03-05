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
		<Compress onClose={() => (show = 0)} />
	{/if}

	{#if show === 2}
		<Convert onClose={() => (show = 0)} />
	{/if}
</div>

<style>
	.container {
		font-family: 'Inter', sans-serif;
		background-color: #f5f5f5; /* Light gray background */
		border-radius: 12px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
		padding: 2rem;
		max-width: 600px; /* Limit container width */
		margin: 2rem auto; /* Center the container */
		text-align: center;
	}

	h1 {
		color: #333333; /* Dark gray text */
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	p {
		color: #625b71; /* Muted purple text */
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}

	.buttons {
		display: flex;
		gap: 1rem;
		justify-content: center; /* Center buttons */
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
