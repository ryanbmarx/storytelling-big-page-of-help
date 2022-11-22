<script>
	// This is a desktop/table cube ad

	import Base from "./Base.svelte";
	export let cst;
	export let ssts;
	export let topic;
</script>

<style>
	.ad-wrapper {
		min-height: 250px;
		display: none;
	}

	@media all and (min-width: 768px) {
		.ad-wrapper {
			display: flex;
		}
	}
</style>

<aside class="ad-wrapper">
	<Base
		class="cube"
		{cst}
		{ssts}
		{topic}
		position="poster"
		sizes={[[300, 250]]}
		display={["desktop", "tablet"]} />
</aside>
