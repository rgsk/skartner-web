export function fuzzySearch(input: string, options: string[]): string[] {
  if (!input) return options;
  const threshold = 1;
  const lowercaseInput = input.toLowerCase();
  const filteredOptions: string[] = options
    .map((option: string) => {
      const lowercaseOption: string = option.toLowerCase();
      const substr: number = findLongestCommonSubstringLength(
        lowercaseInput,
        lowercaseOption
      );
      const subseq: number = findLongestCommonSubsequenceLength(
        lowercaseInput,
        lowercaseOption
      );
      return {
        option: option,
        similarity: substr + subseq / 2,
      };
    })
    .filter((a) => a.similarity >= Math.floor(input.length * threshold))
    .sort((a, b) => b.similarity - a.similarity)
    .map((v) => v.option);

  return filteredOptions;
}

function findLongestCommonSubstringLength(str1: string, str2: string): number {
  const m: number = str1.length;
  const n: number = str2.length;

  const dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
  let maxLength: number = 0;

  for (let i: number = 1; i <= m; i++) {
    for (let j: number = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        maxLength = Math.max(maxLength, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }

  return maxLength;
}
function findLongestCommonSubsequenceLength(
  str1: string,
  str2: string
): number {
  const m: number = str1.length;
  const n: number = str2.length;

  const dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i: number = 1; i <= m; i++) {
    for (let j: number = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
