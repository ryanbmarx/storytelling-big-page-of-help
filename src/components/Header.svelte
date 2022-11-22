<script>
	// COMPONENTS
	import Timestamp from "./ui/Timestamp.svelte";
	import Byline from "./ui/Byline.svelte";

	export let headline = "";
	export let subheadline = "";
	export let intro = "";
	export let byline = "Staff";
	export let organization = "USA TODAY NETWORK";
	export let updated = "";
	export let published = "";
</script>

<style>
	.headline {
		font: bold 2rem / 1.3em var(--fonts-sans-serif);
		font-size: clamp(1.5rem, 7vw, 2rem);
		margin: 0 0 1rem 0;
	}

	.subheadline {
		font: italic var(--font-size-large) / var(--font-line-height) var(--fonts-serif);
		color: var(--color-font);
		font-weight: normal;
		margin: 0.5em 0; /* slight deviation from "margin system"*/
	}
	@media all and (min-width: 768px) {
		header {
			grid-column: 2;
		}
	}
</style>

<header>
	<h1 class="headline">{headline}</h1>
	{#if subheadline}<h2 class="subheadline">{subheadline}</h2>{/if}
	{#if intro}
		{@html intro}
	{/if}
	<Byline {byline} {organization} />
	<Timestamp {published} {updated} />
</header>
