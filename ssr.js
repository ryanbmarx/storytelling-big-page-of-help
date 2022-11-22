#!/usr/bin/env node

require = require("esm")(module);
require("svelte/register");
const path = require("path");
const fs = require("fs/promises");
const { justGetPhotoURL } = require("./src/utils/get-media-data.js");
const App = require("./src/App.svelte").default;
const { UW } = require("./src/utils/uw.js");

const TARGETS = {
	dev: "dev",
	preprod: "preprod",
	master: "master",
	production: "master",
};

const PROJECT_SLUG = path.basename(process.cwd());
const TARGET = TARGETS[process.env.TARGET] || "dev";
const CDN_ROOT =
	"https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps";
const PROJECT_PATH = `${CDN_ROOT}/${TARGET}/${PROJECT_SLUG}`;

const CANONICAL_URL =
	"https://www.jsonline.com/storytelling/milwaukee-resources-guide-housing-mental-health-education-public-safety-voting-employment-recycling/";

module.exports = { render };

// render static html for embedding
async function render() {
	const seed = Date.now();
	const content = await fs
		.readFile(path.join(__dirname, "src/content/data.json"))
		.then(JSON.parse);

	const { html } = App.render(content);

	const styles = [`${PROJECT_PATH}/bundle.css?c=${seed}`];
	const scripts = [`${PROJECT_PATH}/bundle.js?c=${seed}`];

	let share_image = null;
	try {
		share_image = await justGetPhotoURL(content.share_image);
	} catch (e) {
		console.error("Problem getting share image");
	}

	const sstsColon = `ssts:${content.ssts.split("/").join(":")}`;
	const DATE_PUBLISHED = new Date(content.published);
	const DATE_MODIFIED = new Date(content.updated);

	const jsonldMetadata = {
		contentSourceCode: "PMJS",
		siteCode: "PMJS",
		ssts: sstsColon,
		type: "story",
	};

	const jsonld = {
		"@context": "http://schema.org",
		"@type": "NewsArticle",
		author: {
			"@type": "Organization",
			name: "Journal Sentinel",
			logo: "https://www.jsonline.com/sitelogos/m-oc.svg",
		},
		dateModified: DATE_MODIFIED,
		datePublished: DATE_PUBLISHED,
		headline: content.title,
		image: {
			"@type": "ImageObject",
			url: share_image,
		},
		isBasedOn: CANONICAL_URL,
		keywords: ["type:story", sstsColon],
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": CANONICAL_URL,
		},
		isAccessibleForFree: "True",
		metadata: JSON.stringify(jsonldMetadata),
		publisher: {
			"@type": "Organization",
			logo: {
				url: "https://www.jsonline.com/sitelogos/m-oc.svg",
			},
			name: "USA TODAY",
		},
	};

	return UW({
		title: content.title,
		description: content.deck,
		url: CANONICAL_URL,
		share_image,
		share_text: content.share_text,
		scripts,
		styles,
		ssts: content.ssts,
		html: `<div id="${PROJECT_SLUG}">${html}</div>`,
		jsonld: jsonld,
	});
}

if (require.main === module) {
	render()
		.then(uw => JSON.stringify(uw, null, 2))
		.then(console.log)
		.catch(error => {
			console.error("!!!!!! RENDERING ERROR!");
			console.error(error);
		});
}
