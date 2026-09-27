// tally.js：一次扫描统计每个词的元音数、合计、最多值与位置表
import { countVowels } from "./vowels.js";

export function vowelTally(words) {
  const counts = [];
  const mosts = [];
  const none = [];
  let total = 0;
  let biggest = 0;
  for (let spot = 0; spot < words.length; spot += 1) {
    const count = countVowels(words[spot]);
    counts.push(count);
    total += count;
    if (count === 0) none.push(spot);
    if (count > biggest) {
      biggest = count;
      mosts.length = 0;
      mosts.push(spot);
    } else if (count === biggest) {
      mosts.push(spot);
    }
  }
  return { counts: counts, total: total, biggest: biggest, mosts: mosts, none: none };
}
