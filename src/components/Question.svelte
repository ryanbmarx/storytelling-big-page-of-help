<script>
	import * as analytics from "../utils/analytics.js";
	import { isInternal } from "../utils/is-internal.js";

	export let section;
	export let question;
	export let answer = "";
	export let link;
	export let link_text = "Read more";
	export let index;
	export let sectionHeader = 2;

	function linkClick(e) {
		// Story link in a question/answer is clicked | `{internal/outbound} links` | `Big page of help answer link`| `to: {url}`

		analytics.fireEvent({
			category: `${isInternal(this.href) ? "internal" : "outbound"} links`,
			action: "Big page of help answer link",
			label: `to: ${this.href}`,
		});
	}
</script>

<style>
	.question {
		--dot-width: 0.65em;
		--dot-margin: 0.35em;
		--left-margin: calc(var(--dot-margin) + var(--dot-width));
		margin: 0 0 30px 0;
		margin-left: var(--left-margin, 30px);
	}

	.question__text {
		font: bold var(--font-size-large) / var(--font-line-height) var(--fonts-serif);
		margin: 0 0 7px 0;
		margin-left: calc(var(--left-margin, 30px) * -1);
		padding-left: var(--left-margin);
		position: relative;
	}

	.question__text::before {
		content: "";
		display: inline-block;
		height: var(--dot-width, 0.65em);
		width: var(--dot-width, 0.65em);
		/* margin-right: var(--dot-margin, 0.25em); */
		background-color: var(--theme-color, #009bff);
		border-radius: 50%;

		position: absolute;
		left: 0;
		top: 0.35em;
	}

	.question__link {
		font-family: var(--fonts-sans-serif);
		font-weight: bold;
		color: black;
		text-decoration-color: var(--theme-color, #009bff);
	}
</style>

<div class="question" id="{section}-q{index}">
	<svelte:element
		this={`h${sectionHeader + 1}`}
		id="{section}-q{index}-headline"
		class="question__text">{question}</svelte:element>

	{#if answer}
		<div class="question__answer">
			{@html answer}
		</div>
	{/if}

	{#if link && link_text}
		<a
			aria-labelledby="{section}-q{index}-headline"
			class="question__link"
			href={link}
			on:click={linkClick}
			data-click-event="storytelling-election-2020-resources-link-click-{section}-q{index}"
			target="_blank"
			rel="noopener noreferrer">
			{link_text}
		</a>
	{/if}
</div>
