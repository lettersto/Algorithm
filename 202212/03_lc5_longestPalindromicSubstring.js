// 벌써 도저히 모르겠어서 답지 보고 해야할 지경이다.
// 일단 생각하는 방식을 머리에 넣는 게 우선 같다.

// palindrome을 글자 가운데부터 왼쪽, 오른쪽으로 확장해나가면서 체크

const longestPalindrome = (s) => {
  let longWord = "";

  for (let i = 0; i < s.length; i++) {
    // odd
    let left = i;
    let right = i;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      longWord = longWord.length < right - left + 1 ? s.substring(left, right + 1) : longWord;
      left -= 1;
      right += 1;
    }
    // even
    left = i;
    right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      longWord = longWord.length < right - left + 1 ? s.substring(left, right + 1) : longWord;
      left -= 1;
      right += 1;
    }
  }
  
  return longWord;
};


// 겹치는 부분을 함수로 빼보아더니 string을 계속 복사해서 효율은 더 떨어졌다.
const getPalindrome = (s, left, right) => {
  let palindromeWord = "";
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    palindromeWord = palindromeWord.length < right - left + 1 ? s.substring(left, right + 1) : palindromeWord;
    left -= 1;
    right += 1;
  }
  return palindromeWord;
};


const longestPalindrome2 = (s) => {
  let longWord = "";
  let longWordLength = 0;

  for (let i = 0; i < s.length; i++) {
    const oddPalindrome = getPalindrome(s, i, i);
    const evenPalindrome = getPalindrome(s, i, i + 1);
    if (longWordLength < oddPalindrome.length) {
      longWord = oddPalindrome;
      longWordLength = oddPalindrome.length;
    }
    if (longWordLength < evenPalindrome.length) {
      longWord = evenPalindrome;
      longWordLength = evenPalindrome.length;
    }
  }
  return longWord;
};