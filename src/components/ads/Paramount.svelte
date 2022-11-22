<script>
	import Base from "./Base.svelte";
	export let cst;
	export let ssts;
	export let topic;
</script>

<style>
	.ad-wrapper {
		display: none;
	}
	@media all and (min-width: 768px) {
		.ad-wrapper {
			display: flex;
			min-height: 90px;
		}
	}
	@media all and (min-width: 1024px) {
		.ad-wrapper {
			min-height: 250px;
		}
	}
</style>

<aside class="ad-wrapper ad-wrapper--paramount">
	<Base
		class="paramount"
		{cst}
		{ssts}
		{topic}
		position="high_impact"
		sizes={[[728, 90], [970, 250], "fluid"]}
		display={["tablet", "desktop"]}
		targeting={{
			nsf: ["paramount", "paramount-16_9"],
		}} />
</aside>
