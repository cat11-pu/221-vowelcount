// vowels.js：数一个词里的元音字母（aeiou，大小写都算，重复出现重复计数）
const VOWELS = new Set(["a", "e", "i", "o", "u"]);

export function countVowels(word) {
  const text = String(word);
  let count = 0;
  for (const ch of text) {
    if (VOWELS.has(ch.toLowerCase())) {
      count += 1;
    }
  }
  return count;
}
