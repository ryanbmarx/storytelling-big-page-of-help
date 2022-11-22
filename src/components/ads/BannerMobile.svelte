<script>
	import { onMount } from "svelte";

	// This is a mobile-only banner ad
	import Base from "./Base.svelte";
	export let cst;
	export let ssts;
	export let topic;
	let position = "mobileweb-banner_bottom";
	let wrapper;
	onMount(() => {
		// The first (and only the first) mobile banner on a page should be "top" ... the rest 'bottom'
		const mobileBanner = document.querySelector(".mobile-banner");
		if (mobileBanner && mobileBanner.parentNode === wrapper) {
			position = "mobileweb-banner_top";
		}
	});
</script>

<style>
	.ad-wrapper {
		min-height: 50px;
	}

	@media all and (min-width: 768px) {
		.ad-wrapper {
			display: none;
		}
	}
</style>

<aside bind:this={wrapper} class="ad-wrapper">
	<Base
		class="mobile-banner"
		{topic}
		{cst}
		{ssts}
		{position}
		sizes={[[320, 50]]}
		display={["mobile"]} />
</aside>
