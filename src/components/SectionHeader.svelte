<script>
	import { share_text } from "../content/data.json";
	import SocialShare from "./ui/SocialShare.svelte";

	export let shareUrl;
	export let label = "";
	export let id = "";
	export let description = "";
	export let sectionHeader;
</script>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin: 0 0 15px 0;
		position: relative;
	}

	.label {
		font: bold 25px/1.3em var(--fonts-serif);
		font-size: calc(24px + 12 * ((100vw - 320px) / 880));
		font-style: italic;
		position: relative;
		margin: 0 0 7px 0;
		z-index: 2;
	}

	.label::after {
		content: "";
		display: block;
		height: 0.39em;
		width: 100%;
		background: var(--color-tangent-blue);
		opacity: 0.5;

		position: absolute;
		top: 100%;
		left: 0;
		transform: translate(0, -0.47em);
	}

	@supports (mix-blend-mode: multiply) {
		.label::after {
			mix-blend-mode: multiply;
			opacity: 1;
		}
	}

	/* Tweaks to share buttons */
	.container :global(ul.share) {
		/* This neegative margin nudges the buttons so that the icon, not the containing button, aligns with the right edge. */
		margin: 0 -7px 0 auto;
	}

	.container :global(.share-btn__inner) {
		border-radius: 50%;
	}

	@media all and (min-width: 450px) {
		.label {
			display: inline-block;
		}
	}

	@media all and (min-width: 768px) {
		.label {
			font-size: 35px;
		}
	}
</style>

<div class="container">
	{#if label}
		<svelte:element this={`h${sectionHeader}`} class="label">{label}</svelte:element>
	{/if}
	<SocialShare
		shareID={id}
		shareHeadline={description || share_text}
		circles={true}
		reddit={false}
		linkedin={false}
		label=""
		project="Big Page of Help"
		alignment="right"
		{shareUrl} />
</div>
