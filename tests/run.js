import assert from "node:assert";
import { countVowels } from "../vowels.js";
import { vowelTally } from "../tally.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("countVowels returns a number", () => {
  assert.strictEqual(typeof countVowels("abc"), "number");
});

check("vowelTally returns counts", () => {
  assert.ok(Array.isArray(vowelTally(["abc"]).counts));
});

check("vowelTally returns mosts", () => {
  assert.ok(Array.isArray(vowelTally(["abc"]).mosts));
});

check("render counts words", () => {
  assert.strictEqual(typeof render({ words: ["abc"] }).count, "number");
});

check("render exposes mosts flag", () => {
  assert.strictEqual(typeof render({ words: ["abc"] }).mosts_ok, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
