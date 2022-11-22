<script>
	import { onMount, afterUpdate } from "svelte";
	import * as analytics from "../utils/analytics.js";
	import { activeButton } from "../stores.js";

	export let sections = {};

	let nav;
	afterUpdate(() => {
		const el = nav.querySelector(`[href="#${$activeButton}"]`);
		if (el) el.focus({ preventScroll: true });
	});
	onMount(() => {
		// Check for nav height here. We'll assume it's UW, but if it is tangent, then adjust our fixed top.
		const header = document.querySelector(".gnt_n");
		if (header) {
			nav.style.top = `${header.offsetHeight}px`;
		}
	});

	function navClick(e) {
		const target = this.dataset.sectionId;
		$activeButton = target;

		// Smooth scroll is not natvely supported in the CSS.
		// We are probably on Safari.
		const targetScrollTop = document.getElementById(target).getBoundingClientRect();

		const scrollTarget = targetScrollTop.top - window.innerHeight / 5;

		window.scrollBy({
			top: scrollTarget,
			left: 0,
			behavior: "smooth",
		});

		analytics.fireEvent({
			category: `navigation`,
			action: `Big page of help category`,
			label: `Jump to category`,
		});
	}
</script>

<style>
	.nav {
		--main-nav-height: 60px; /* Assumes UW header*/
		margin: 30px 0;
		/* background: var(--color-tangent-blue-screen); */
		/* padding: 15px; */
		box-sizing: border-box;
	}
	:global(.resources) .nav__label {
		font: bold 16px/1.4em var(--fonts-sans-serif);
		margin: 0 0 15px 0;
	}
	.nav__links {
		margin: 0;
		padding: 0;
		list-style: none;

		display: grid;
		grid-gap: 7px;
		grid-template: auto / repeat(auto-fit, minmax(100px, 1fr));
	}

	.nav__btn {
		font: bold 14px/1.4em var(--fonts-sans-serif);
		color: var(--theme-color, #009bff);
		text-decoration: none;
		display: flex;
		align-items: center;
		min-height: 44px;
		border-bottom: 1px solid var(--theme-color, #009bff);
	}

	.nav__btn:hover,
	.nav__btn:focus {
		opacity: 0.85;
	}

	@media all and (min-width: 400px) {
		.nav__links {
			grid-template: auto / repeat(auto-fit, minmax(150px, 1fr));
		}
	}
	@media all and (min-width: 768px) {
		/* resources--supports-io */

		.nav {
			/* Stick it below the nav */
			position: sticky;
			align-self: start; /* Let's it have height of `auto` as a grid item. This helps with sticky. */
			/* No taller than the viewport height. Anything more and we will scroll */
			max-height: calc(90vh - var(--main-nav-height, 60px));
			overflow-y: auto;

			/* This can adjust in JS if we find a tangent header*/
			top: var(--main-nav-height, 60px);

			/* Place in the grid */
			grid-column: 1;
			grid-row: 1/-1;
			margin: 0;
			z-index: 2;

			/* keep it in the grid track */
			width: 100%;
			max-width: var(--nav-width, 275px);
		}

		.nav__links {
			display: block;
		}
		.nav__btn {
			display: block;
			font-size: 16px;
			padding: 10px;
			min-height: 0;
			color: black;
		}
		:global(.resources--supports-io) .nav__btn {
			opacity: 0.65;
			font-weight: normal;
			transition: background-color var(--transition-time, 150ms) ease,
				opacity var(--transition-time, 150ms) ease,
				color var(--transition-time, 150ms) ease;
		}

		:global(.resources--supports-io) .nav__btn:hover,
		:global(.resources--supports-io) .nav__btn:focus,
		:global(.resources--supports-io) .nav__btn--active,
		:global(.resources--supports-io) .nav__btn:hover.nav__btn--active,
		:global(.resources--supports-io) .nav__btn:focus.nav__btn--active {
			background-color: var(--theme-color, #009bff);
			color: var(--theme-color-text, #ffffff);
			opacity: 1;
		}
		:global(.resources--supports-io) .nav__btn--active {
			font-weight: bold;
		}
		:global(.resources--supports-io) .nav__btn:hover,
		:global(.resources--supports-io) .nav__btn:focus {
			opacity: 0.5;
		}
	}
</style>

<nav class="nav" bind:this={nav}>
	<p class="nav__label">What do you need to know?</p>
	<ul class="nav__links">
		{#each Object.entries(sections) as [id, section] (id)}
			<li>
				<a
					class="nav__btn"
					class:nav__btn--active={id == $activeButton}
					href="#{section.id}"
					data-section-id={section.id}
					on:click|preventDefault={navClick}>
					{section.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
