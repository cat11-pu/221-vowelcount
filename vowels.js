// vowels.js：数一个词里五个元音字母（大小写都算，重复出现重复计数）
const VOWELS = "aeiouAEIOU";

export function countVowels(word) {
  const text = String(word);
  if (text.trim().length === 0) {
    const error = new Error("E_BAD_WORD: word is empty after trimming");
    error.code = "E_BAD_WORD";
    throw error;
  }
  let count = 0;
  for (let spot = 0; spot < text.length; spot += 1) {
    if (VOWELS.indexOf(text[spot]) !== -1) count += 1;
  }
  return count;
}
