// tally.js：一次扫描统计全部词（每词只数一次）
import { countVowels } from "./vowels.js";

export function vowelTally(words) {
  const counts = [];
  const mosts = [];
  const none = [];
  let total = 0;
  let biggest = 0;

  words.forEach((word, spot) => {
    if (String(word).trim() === "") {
      const error = new Error("词去空白后为空");
      error.code = "E_BAD_WORD";
      throw error;
    }
    const n = countVowels(word);
    counts.push(n);
    total += n;
    if (n > biggest) {
      biggest = n;
      mosts.length = 0;
      mosts.push(spot);
    } else if (n === biggest) {
      mosts.push(spot);
    }
    if (n === 0) {
      none.push(spot);
    }
  });

  return { counts, total, biggest, mosts, none };
}
