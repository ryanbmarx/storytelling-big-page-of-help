<script type="text/javascript">
	import { onMount } from "svelte";

	// Props for the GAM data
	export let ssts = "news";
	export let cst = "";
	export let network = 7103; //  7070 is the dummy account, for FPO ads
	export let build = "static-o-matic"; // TODO: Change to `storytelling` when it is available

	// pagetype : story, article or interactives
	export let pageType = "interactive"; // TODO: Can/should this inherit the pageview pageType value?

	// Props for ad slots
	export let position;
	export let sizes;
	export let display = ["mobile"];
	export let targeting;

	// Example: topic = ["olympics-roster-winter-2022"]
	export let topic = [];

	let scriptURL = `https://www.gannett-cdn.com/ads/scripts/framework/basic.min.js?d=${Date.now()}`;
	let scriptID = "advertisement-library";

	export let breakpoints = {
		desktop: 1024,
		tablet: 768,
		mobile: 0,
	};

	let clazz;
	export { clazz as class };

	// generate a random slot id. Doesn't matter what it is, it just
	// needs to be unique to the div on a page (potentially) full of
	// advertisement divs.
	const id = `ad-${String(Math.random()).replace(".", "")}`;

	onMount(async () => {
		// If a cst is not  set, default to ssts.

		// Make sure stray hidden characters are not in our values
		ssts = sanitize(ssts);
		cst = !cst ? ssts : sanitize(cst);

		// Put our ad config into the window, if it isn't already there.
		// naturally, we can only have one config per project/page/application
		window.gntX = window.gntX || {
			gam: {
				...getAccountData(),
				network,
			},
			cst: cst.split("/"),
			ssts: ssts.split("/"),
			refreshRate: 30, // in seconds
			targeting: {
				topic,
				build,
				// TODO: Inherit from the PV type in  GA data
				pageType,
			},
			breakpoints,
			// AD SLOT CONFIG
			slots: {},
		};

		// Establish our command queue for ads. This will get picked up by the ad framework when it is ready
		window.gntX.queue = window.gntX.queue || [];

		// Load the ad framework once and only once.
		await loadScript(scriptURL, scriptID, true).catch(console.error);

		const adCfg = {
			sizes,
			position,
			display,
		};

		if (targeting) adCfg.targeting = targeting;

		// Once it is loaded, start filling in the queue
		window.gntX.queue.push(function () {
			window.createSlot(id, adCfg);
		});
	});

	function loadScript(url, id, sync) {
		// prevent duplicate script loads
		if (document.querySelector(`#${id}`)) {
			return Promise.resolve(url);
		}
		return new Promise(function (resolve, reject) {
			var tag = document.createElement("script");
			tag.id = id;
			if (sync !== true) {
				tag.async = true;
			}
			tag.src = url;

			// Important success and error for the promise
			tag.onload = function () {
				resolve(url);
			};
			tag.onerror = function () {
				reject(url);
			};
			document.body.appendChild(tag);
		});
	}

	function getAccountData() {
		if (window?.ga_data?.site?.ads?.dfp) {
			const { acctName = "usatoday", mobileAcctName = "usatoday_mobile" } =
				window?.ga_data?.site?.ads?.dfp;

			return {
				acctName,
				mobileAcctName,
			};
		}
		return { acctName: "usatoday", mobileAcctName: "usatoday_mobile" };
	}

	/**
	 * Replace anything that is not a letter, number, backslash, underscore (which is a  word char, `\w`) or dash.
	 * */
	function sanitize(str = "") {
		if (!str) return;
		return str.replace(/[^\w\-\/]/gi, "").trim();
	}
</script>

<style>
	.ad::before {
		content: "Advertisement";
		font: 11px / 1em var(--fonts-sans-serif);
		color: var(--color-font-muted);
		margin: 0 auto 0.33em auto;
		text-align: center;
		display: block;
	}
</style>

<div class="ad {clazz}" {id} />
