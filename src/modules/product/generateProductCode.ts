import crypto from "crypto";

interface SubstringInfo {
  value: string;
  startIndex: number;
  endIndex: number;
}

// Utility to generate random alphanumeric characters
function generateRandomChars(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    result += chars[randIndex];
  }
  return result;
}

// Finds all longest strictly increasing substrings
function findLongestIncreasingSubstrings(str: string): SubstringInfo[] {
  const substrings: SubstringInfo[] = [];
  let maxLength = 0;
  let current = "";
  let startIdx = 0;

  for (let i = 0; i < str.length; i++) {
    if (current === "" || str[i] > current[current.length - 1]) {
      if (current === "") startIdx = i;
      current += str[i];
    } else {
      if (current.length > maxLength) {
        substrings.length = 0;
        substrings.push({ value: current, startIndex: startIdx, endIndex: i - 1 });
        maxLength = current.length;
      } else if (current.length === maxLength) {
        substrings.push({ value: current, startIndex: startIdx, endIndex: i - 1 });
      }
      current = str[i];
      startIdx = i;
    }
  }

  if (current.length > 0) {
    if (current.length > maxLength) {
      substrings.length = 0;
      substrings.push({ value: current, startIndex: startIdx, endIndex: str.length - 1 });
    } else if (current.length === maxLength) {
      substrings.push({ value: current, startIndex: startIdx, endIndex: str.length - 1 });
    }
  }

  return substrings;
}

export function generateProductCode(productName: string): string {
  const cleanedName = productName.toLowerCase().replace(/\s+/g, "");
  const hash = crypto.createHash("md5").update(cleanedName).digest("hex").slice(0, 7);

  const substrings = findLongestIncreasingSubstrings(cleanedName);
  const combinedSubstring = substrings.map(s => s.value).join("");
  const startIndex = substrings.length > 0 ? substrings[0].startIndex : 0;
  const endIndex = substrings.length > 0 ? substrings[substrings.length - 1].endIndex : 0;

  let middle = `${startIndex}${combinedSubstring}${endIndex}`;

  // Total target length: 20 chars (7 + 1 + 12)
  const totalMiddleLength = 12;
  if (middle.length < totalMiddleLength) {
    const filler = generateRandomChars(totalMiddleLength - middle.length);
    middle += filler;
  } else if (middle.length > totalMiddleLength) {
    middle = middle.slice(0, totalMiddleLength); // truncate to fixed length
  }

  return `${hash}-${middle}`;
}
