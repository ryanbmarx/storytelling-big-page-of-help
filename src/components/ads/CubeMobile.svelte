<script>
	// This is a mobile-only cube ad
	import Base from "./Base.svelte";
	export let cst;
	export let ssts;
	export let topic;
</script>

<style>
	.ad-wrapper {
		min-height: 250px;
	}

	@media all and (min-width: 768px) {
		.ad-wrapper {
			display: none;
		}
	}
</style>

<aside class="ad-wrapper">
	<Base
		class="cube cube--mobile"
		{topic}
		{cst}
		{ssts}
		position="mobileweb-banner_top"
		sizes={[[300, 250]]}
		display={["mobile"]} />
</aside>
