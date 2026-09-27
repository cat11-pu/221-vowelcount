// tally.js：统计（基线：一律给空表）
import { countVowels } from "./vowels.js";

export function vowelTally(words) {
  return { counts: [], total: 0, biggest: 0, mosts: [], none: [] };
}
