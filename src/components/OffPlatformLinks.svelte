<script>
	// UTILS
	import * as analytics from "../utils/analytics.js";
	import { isInternal } from "../utils/is-internal.js";

	// COMPONENTS
	import SectionHeader from "./SectionHeader.svelte";
	import Facebook from "./ui/icons/Facebook.svelte";
	import Email from "./ui/icons/Email.svelte";
	import QandA from "./ui/icons/QandA.svelte";

	export let off_platform;
	export let id;
	export let title;

	export let label = "";

	function handleClick(e) {
		analytics.fireEvent({
			category: `${isInternal(this.href) ? "internal" : "outbound"} links`,
			action: "Big page of help off-platform link",
			label: `to: ${this.href}`,
		});
	}
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
	}

	.off-links {
		margin: 0;
		padding: 0;
		list-style: none;

		display: grid;
		grid-gap: 30px;
		grid-template: auto / repeat(auto-fit, minmax(175px, 1fr));
	}
	.off-link__description {
		font: var(--body-text-size) / var(--body-text-line-height) var(--fonts-serif);
	}
	.off-link__link {
		font-family: var(--fonts-sans-serif);
		font-weight: bold;
		color: black;
		text-decoration-color: var(--theme-color, #009bff);
	}

	.off-link__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--theme-color, #009bff);
		border-radius: 50%;
		margin: 0 0 8px 0;
	}

	.off-link__icon :global(svg) {
		fill: var(--theme-color-text, white);
		height: 55%;
	}
</style>

<section class="section" {id}>
	<SectionHeader {label} {title} />
	<ul class="off-links">
		{#each off_platform as link, idx}
			{#if link.link && link.link_text}
				<li class="off-link">
					<a
						on:click={handleClick}
						href={link.link}
						data-network={link.id}
						target="_blank"
						rel="noopener noreferrer">
						<span class="off-link__icon">
							{#if link.id == "facebook"}
								<Facebook />
							{/if}
							{#if link.id == "newsletter"}
								<Email />
							{/if}
							{#if link.id == "submit"}
								<QandA title="Submit your questions" />
							{/if}
						</span>
					</a>
					<p class="off-link__description">{link.description}</p>
					<a
						on:click={handleClick}
						class="off-link__link"
						href={link.link}
						target="_blank"
						data-network={link.id}
						rel="noopener noreferrer">
						{link.link_text}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</section>
