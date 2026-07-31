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
  assert.match(html, /class="language-toggle"/i);
  assert.match(html, /Traduzir site para inglês/i);
  assert.match(html, /class="manifesto-lead reveal"/i);
  assert.match(html, /class="text-link manifesto-process-link reveal"/i);
  assert.match(html, /href="#processo-04"/i);
  assert.match(html, /id="processo-04"/i);
  assert.match(html, /Projetos em destaque/);
  assert.match(html, /data-count="360"/i);
  assert.match(html, /data-count="3" data-pad="2"/i);
  assert.match(html, /class="project-viewport"/i);
  assert.match(html, /class="project-track"/i);
  assert.match(
    html,
    /Mosaico_Maoka_01\.mp4[\s\S]*Mosaico_Maoka_05\.mp4/i,
  );
  assert.match(
    html,
    /Mosaico_Maoka_01_desktop\.mp4[\s\S]*Mosaico_Maoka_05_desktop\.mp4/i,
  );
  assert.doesNotMatch(html, /Mosaico_Maoka_06(?:_desktop)?\.mp4/i);
  assert.match(html, /maokacenografia@gmail\.com/);
  assert.match(html, /wa\.me\/5512982141215/i);
  assert.match(html, /wa\.me\/553192066650/i);
  assert.match(html, /\+55 12 98214-1215/i);
  assert.match(html, /\+55 31 9206-6650/i);
  assert.doesNotMatch(html, /5531992066650|\+55 31 99206-6650/i);
  assert.match(html, /behance\.net\/maokacenografia/i);
  assert.match(html, /linkedin\.com\/company\/maokacenografia/i);
  assert.doesNotMatch(html, /aria-label="Filtrar projetos"/i);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});
