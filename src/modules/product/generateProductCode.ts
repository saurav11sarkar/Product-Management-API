import crypto from "crypto";

interface SubstringInfo {
  value: string;
  startIndex: number;
  endIndex: number;
}

// Get a deterministic string from hash to use as filler
function generateDeterministicFill(productName: string, length: number): string {
  const hash = crypto.createHash("sha256").update(productName).digest("hex");
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let filler = "";

  for (let i = 0; i < length; i++) {
    const index = parseInt(hash.slice(i * 2, i * 2 + 2), 16) % chars.length;
    filler += chars[index];
  }

  return filler;
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

// ✅ FINAL FUNCTION
export function generateProductCode(productName: string): string {
  const cleanedName = productName.toLowerCase().replace(/\s+/g, "");
  const hash = crypto.createHash("md5").update(cleanedName).digest("hex").slice(0, 7);

  const substrings = findLongestIncreasingSubstrings(cleanedName);
  const combinedSubstring = substrings.map(s => s.value).join("");
  const startIndex = substrings.length > 0 ? substrings[0].startIndex : 0;
  const endIndex = substrings.length > 0 ? substrings[substrings.length - 1].endIndex : 0;

  let middle = `${startIndex}${combinedSubstring}${endIndex}`;

  const totalMiddleLength = 12;
  if (middle.length < totalMiddleLength) {
    const filler = generateDeterministicFill(cleanedName, totalMiddleLength - middle.length);
    middle += filler;
  } else if (middle.length > totalMiddleLength) {
    middle = middle.slice(0, totalMiddleLength);
  }

  return `${hash}-${middle}`;
}
