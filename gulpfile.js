const assert = require("assert");
const path = require("path");
const fs = require("fs/promises");
const Gootenberg = require("gootenberg");
const groupBy = require("lodash/groupBy");
const ssr = require("./ssr.js");

// the directory we're in is our project slug, always
// if you need a different project URL, use UW config
const PROJECT_SLUG = path.basename(process.cwd());

const REQUIRED_ENVS = ["GAPI_CLIENT_EMAIL", "GAPI_PRIVATE_KEY"];

// const OUTPUT_DIR = "./src/content";

const GIT_BRANCH = process.env.GIT_BRANCH || "dev";
const CDN_ROOT =
	"https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps";
// const PROJECT_PATH = `${CDN_ROOT}/${GIT_BRANCH}/${PROJECT_SLUG}`;

// // https://docs.google.com/spreadsheets/d/1iirSEyDFOQS2QN8VCjyJhTSPE5-F2x4LlZbYQX50X68/
// const SPREADSHEET_KEY = "1iirSEyDFOQS2QN8VCjyJhTSPE5-F2x4LlZbYQX50X68";

module.exports = {
	default: check,
	auth,
	uw,
};

async function check() {
	console.log("Checking configuration.");

	REQUIRED_ENVS.forEach(key => {
		assert(
			key in process.env,
			`${key} not found. Please check your .env and try again.`
		);
	});

	console.log("Good to gulp.");
}

async function auth() {
	const goot = new Gootenberg();
	await goot.auth.jwt();

	return goot;
}

async function uw() {
	const uw = await ssr.render();
	return fs.writeFile(`./public/uw/${PROJECT_SLUG}.json`, JSON.stringify(uw, null, 2));
}
