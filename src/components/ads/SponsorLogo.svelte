<script>
	import Base from "./Base.svelte";
	export let cst;
	export let ssts;
	export let topic;
</script>

<style>
	.ad-wrapper {
		width: 100px;
		height: 30px;
	}
	@media all and (min-width: 768px) {
		.ad-wrapper {
			width: 200px;
			height: 60px;
		}
	}
</style>

<aside class="ad-wrapper">
	<Base
		class="sponsor-logo"
		{cst}
		{ssts}
		{topic}
		position="sponsor_logo"
		sizes={[[200, 60]]}
		display={["tablet", "desktop"]} />
	<Base
		class="sponsor-logo"
		{cst}
		{ssts}
		{topic}
		position="mobileweb-sponsor_logo"
		sizes={[[100, 30]]}
		display={["mobile"]} />
</aside>
