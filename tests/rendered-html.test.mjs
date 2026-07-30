import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Maoka portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Maoka — Cenografia &amp; Experiência/i);
  assert.match(html, /Damos forma/);
  assert.match(html, /Sign Outline\.svg/);
  assert.match(html, /Ideia em/i);
  assert.match(html, /movimento/i);
  assert.match(html, /Projetos em destaque/);
  assert.match(html, /maokacenografia@gmail\.com/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});
