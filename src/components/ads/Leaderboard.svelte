<script>
	import { onMount } from "svelte";
	import Base from "./Base.svelte";
	export let cst;
	export let ssts;
	export let topic;

	let position = "leaderboard_btf";
	let wrapper;

	onMount(() => {
		// The first (and only the first) mobile banner on a page should be "top" ... the rest 'bottom'
		const mobileBanner = document.querySelector(".leaderboard");
		if (mobileBanner && mobileBanner.parentNode === wrapper) {
			position = "leaderboard_atf";
		}
	});
</script>

<style>
	.ad-wrapper {
		min-height: 90px;
		display: none;
	}

	@media all and (min-width: 768px) {
		.ad-wrapper {
			display: flex;
		}
	}
	@media all and (min-width: 1024px) {
		.ad-wrapper {
			min-height: 250px;
		}
	}
</style>

<aside class="ad-wrapper" bind:this={wrapper}>
	<Base
		class="leaderboard"
		{cst}
		{ssts}
		{topic}
		{position}
		sizes={{
			desktop: [
				[728, 90],
				[970, 250],
			],
			tablet: [[728, 90]],
		}}
		display={["desktop", "tablet"]} />
</aside>
