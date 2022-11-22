import data from "./content/data.json";
import App from "./App.svelte";

const app = new App({
  hydrate: true,
  target: document.getElementById(process.env.PROJECT_SLUG),
  props: data
});

export default app;
