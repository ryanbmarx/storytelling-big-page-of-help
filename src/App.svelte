<script>
	// UTILS
	import { onMount } from "svelte";
	import * as analytics from "./utils/analytics.js";

	// COMPONENTS
	import Header from "./components/Header.svelte";
	import OffPlatformLinks from "./components/OffPlatformLinks.svelte";
	import Nav from "./components/Nav.svelte";
	import Section from "./components/Section.svelte";
	import Cube from "./components/ads/Cube.svelte";
	import CubeMobile from "./components/ads/CubeMobile.svelte";

	// HEADER CONTENT
	export let title = "";
	export let headline = "";
	export let subheadline = "";
	export let byline = "";
	export let organization = "";
	export let intro = "";
	export let updated = "";
	export let published = "";

	export let ssts = "news";
	export let cst = "news";
	export let sections = {}; // grouped by id
	export let questions = {}; // grouped by section
	export let off_platform = []; // Other resourcexs

	let resources;
	let supportsIO;

	let sectionHeader = subheadline ? 3 : 2;

	onMount(() => {
		supportsIO = typeof window.IntersectionObserver === "function";
		analytics.firePageView("free");
	});
</script>

<style>
	:global(html, body) {
		--fonts-sans-serif: "Unify Sans", "Helvetica", "Arial", sans-serif;
		--fonts-serif: "Georgia", "Times New Roman", serif;

		--font-size-small: 0.85rem;
		--font-size: 1rem;
		--font-size-large: 1.4rem;
		--font-line-height: 1.4em;

		--color-usat-blue: #009bff;
		--color-tangent-blue: #b9e1ff;
		--color-tangent-blue-screen: #e8f2fa;
		--theme-color: var(--color-usat-blue, #009bff);
		--theme-color-text: white;
		--color-font: #222;
		--color-font-muted: #888;

		--transition-time: 150ms;

		--nav-width: 275px;

		scroll-behavior: smooth;
	}

	.resources :global(p) {
		font: normal var(--font-size) / var(--font-line-height) var(--fonts-serif);
		margin: 1rem 0;
	}

	.resources {
		padding: 30px 15px;
		max-width: 900px;
		margin: 0 auto;
	}

	.sections {
		margin-bottom: 30px;
	}

	.resources :global(.ad-wrapper .ad) {
		margin: 0 auto;
	}

	@media all and (min-width: 768px) {
		.resources {
			display: grid;
			grid-gap: 30px;
			grid-template: auto 1fr / var(--nav-width, 275px) minmax(auto, 625px);
		}

		.resources :global(.sections) {
			grid-column: 2;
		}
	}
</style>

<svelte:options accessors />

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="resources" class:resources--supports-io={supportsIO} bind:this={resources}>
	<Header {headline} {subheadline} {intro} {published} {updated} {byline} {organization}/>
	<Nav {sections} />
	<div class="sections">
		{#each Object.entries(sections) as [id, section], index (id)}
			{#if id == "other"}
				<OffPlatformLinks {...section} {id} {off_platform} />
			{:else}
				<Section {sectionHeader} {...section} questions={questions[id]} />
			{/if}

			{#if (index + 1) % 3 == 0 && index > 0}
				<Cube {ssts} {cst} />
				<CubeMobile {ssts} {cst} />
			{/if}
		{/each}
	</div>
</div>
