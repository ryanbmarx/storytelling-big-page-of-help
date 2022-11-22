<script>
	import Question from "./Question.svelte";
	import SectionHeader from "./SectionHeader.svelte";
	import { onMount } from "svelte";
	import { activeButton } from "../stores.js";

	export let id;
	export let title;
	export let description = "";
	export let label = "";
	export let questions = [];
	export let sectionHeader = 2;

	let shareUrl = generateShareUrl();

	let section;

	function generateShareUrl() {
		if (typeof window == "undefined") return null;
		const url = new URL(window.location.href);
		url.hash = id;
		return url.toString();
	}

	onMount(() => {
		if (typeof window !== "undefined" && window.IntersectionObserver) {
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						// set the src attribute and bail
						if (entry.isIntersecting && entry.intersectionRatio >= 0) {
							$activeButton = section.id;
						}
					});
				},
				{
					// Register scroll about 50% up the screen
					rootMargin: "-50% 0px",
				}
			);
			observer.observe(section);
		}
	});
</script>

<style>
	.section {
		margin: 30px 0 0 0;
		padding: 30px 0 0 0;
		border-top: 1px solid #eee;
	}

	.section:first-child {
		border-top: none;
		margin-top: 0;
		padding-top: 0;
	}
</style>

<section {id} class="section" bind:this={section}>
	<SectionHeader {sectionHeader} {id} {label} {title} {shareUrl} {description} />

	{#each questions as question, i}
		<Question {sectionHeader} {...question} index={i} />
	{/each}
</section>
