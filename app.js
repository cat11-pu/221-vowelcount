// app.js：渲染结果
import { countVowels } from "./vowels.js";
import { vowelTally } from "./tally.js";

export function render(spec) {
  const words = spec.words || [];
  const view = vowelTally(words);
  const counts = view.counts || [];
  const mosts = view.mosts || [];
  const none = view.none || [];
  return { counts: counts, total: view.total || 0, biggest: view.biggest || 0,
           mosts: mosts, none: none, count: counts.length,
           mosts_ok: mosts.every((spot) => counts[spot] === (view.biggest || 0)),
           tail: countVowels("ae") };
}
