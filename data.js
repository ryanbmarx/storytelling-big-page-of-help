const assert = require("assert");
const path = require("path");
const fs = require("fs/promises");
const Gootenberg = require("gootenberg");
const groupBy = require("lodash/groupBy");
const marked = require("marked").parse;

// the directory we're in is our project slug, always
// if you need a different project URL, use UW config
const PROJECT_SLUG = path.basename(process.cwd());

const REQUIRED_ENVS = ["GAPI_CLIENT_EMAIL", "GAPI_PRIVATE_KEY"];

const OUTPUT_DIR = "./src/content";

const GIT_BRANCH = process.env.GIT_BRANCH || "dev";
const CDN_ROOT =
	"https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps";
const PROJECT_PATH = `${CDN_ROOT}/${GIT_BRANCH}/${PROJECT_SLUG}`;

const SPREADSHEET_KEY = "***";

module.exports = {
	check,
	auth,
	default: data,
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

async function data() {
	console.log("Checking");
	await check();

	// fetch data here
	const goot = await auth();
	const table = await goot.parse.table(SPREADSHEET_KEY);

	const top = table.top.reduce((m, row) => {
		m[row.key] = row.value;
		return m;
	}, {});

	top.date_published = new Date(top.date_published);
	top.date_updated = new Date(top.date_updated);
	top.intro = marked(top.intro);

	const sections = table.sections.reduce((m, row) => {
		delete row.Notes;
		m[row.id] = row;
		return m;
	}, {});

	let questions = table.questions.map(q => {
		delete q.Notes;
		q.answer = marked(q.answer);
		q.link = genericLink(q.link);
		return q;
	});

	questions = groupBy(questions, "section");

	// simple rows, no processing needed
	const { off_platform } = table;

	return fs.writeFile(
		`${OUTPUT_DIR}/data.json`,
		JSON.stringify({ ...top, sections, questions, off_platform }, null, 2)
	);
}

/**
 * Make a usatoday.com link domain-relative, for the network
 *
 * @example genericLink('https://www.usatoday.com/in-depth/graphics/2020/03/10/us-coronavirus-map-tracking-united-states-outbreak/4945223002/') -> '/in-depth/graphics/2020/03/10/us-coronavirus-map-tracking-united-states-outbreak/4945223002/'
 * @param {URL} u
 */
function genericLink(u) {
	if (!u) return "";

	const url = new URL(u, "https://www.usatoday.com");
	if (url.hostname !== "www.usatoday.com") {
		return u;
	}

	return url.pathname;
}

if (require.main === module) {
	data();
}
