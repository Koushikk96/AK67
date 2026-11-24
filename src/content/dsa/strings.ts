import { DSAProblem } from '@/types/dsa';

export const stringProblems: DSAProblem[] = [
  {
    id: 'valid-anagram',
    number: 13,
    title: 'Valid Anagram',
    category: 'Strings',
    difficulty: 'Easy',
    description:
      'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    keyConcepts: ['Frequency Array', 'ASCII Hash', 'Length Early Exit'],
    pattern: 'Frequency Table / Counting',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) (fixed 26-element array)',
    hints: [
      'First, if the lengths of s and t differ, can they be anagrams?',
      'Since the alphabet is limited to lowercase English letters, a fixed-size integer array of size 26 is faster than a hash map.',
      'Increment counts for characters in s, decrement for characters in t, and verify all counts end at zero.',
    ],
    cppSolution: `#include <string>
#include <vector>

class Solution {
public:
    bool isAnagram(const std::string& s, const std::string& t) {
        if (s.length() != t.length()) return false;
        int count[26] = {0};
        for (size_t i = 0; i < s.length(); ++i) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
};`,
    pythonSolution: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count: dict[str, int] = {}
        for ch in s:
            count[ch] = count.get(ch, 0) + 1
        for ch in t:
            if ch not in count or count[ch] == 0:
                return False
            count[ch] -= 1
        return True`,
    javaSolution: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }
        for (int count : freq) {
            if (count != 0) return false;
        }
        return true;
    }
}`,
    edgeCases: ['Strings of unequal lengths', 'Single letter identical strings', 'Repeated identical characters'],
    commonMistakes: ['Sorting strings takes O(n log n); an integer frequency array takes O(n) and O(1) space'],
    interviewExplanation:
      'Early exit on s.length() != t.length(). Then maintain a 26-int frequency buffer in a single pass. Emphasize why fixed array size 26 qualifies as O(1) auxiliary space.',
  },
  {
    id: 'valid-palindrome',
    number: 14,
    title: 'Valid Palindrome',
    category: 'Strings',
    difficulty: 'Easy',
    description:
      'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      { input: 's = "race a car"', output: 'false' },
      { input: 's = " "', output: 'true', explanation: 'An empty string reads the same forward and backward.' },
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    keyConcepts: ['Two Pointers', 'isalnum', 'tolower', 'In-Place Traversal'],
    pattern: 'Two Pointers (Inward Convergence)',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Can you solve this without allocating a new filtered string?',
      'Use two pointers, left starting at 0 and right starting at length - 1.',
      'Skip non-alphanumeric characters using std::isalnum, convert using std::tolower, and compare pointers inwards.',
    ],
    cppSolution: `#include <string>
#include <cctype>

class Solution {
public:
    bool isPalindrome(const std::string& s) {
        int left = 0;
        int right = static_cast<int>(s.length()) - 1;

        while (left < right) {
            while (left < right && !std::isalnum(static_cast<unsigned char>(s[left]))) {
                left++;
            }
            while (left < right && !std::isalnum(static_cast<unsigned char>(s[right]))) {
                right--;
            }
            if (std::tolower(static_cast<unsigned char>(s[left])) !=
                std::tolower(static_cast<unsigned char>(s[right]))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
};`,
    pythonSolution: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
    javaSolution: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
    edgeCases: ['String with no alphanumeric characters (e.g. "., ")', 'Single alphanumeric character', 'Mixed case palindromes'],
    commonMistakes: ['Allocating a new string for sanitized characters, wasting O(n) space instead of two pointers'],
    interviewExplanation:
      'Walk through the inward two-pointer technique. Mention casting characters to unsigned char when passing to std::isalnum and std::tolower to prevent undefined behavior with negative char values.',
  },
  {
    id: 'longest-common-prefix',
    number: 15,
    title: 'Longest Common Prefix',
    category: 'Strings',
    difficulty: 'Easy',
    description:
      'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'There is no common prefix among the input strings.' },
    ],
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] consists of only lowercase English letters.'],
    keyConcepts: ['Vertical Scanning', 'Prefix Truncation', 'String Bounds'],
    pattern: 'Vertical Character Scanning',
    timeComplexity: 'O(S) where S is the sum of characters in all strings',
    spaceComplexity: 'O(1)',
    hints: [
      'Look at character 0 of all strings, then character 1, and so on (vertical scanning).',
      'Stop as soon as you find a character mismatch or reach the end of any string.',
      'Return the substring of the first string up to the point of mismatch.',
    ],
    cppSolution: `#include <vector>
#include <string>

class Solution {
public:
    std::string longestCommonPrefix(const std::vector<std::string>& strs) {
        if (strs.empty()) return "";

        for (size_t col = 0; col < strs[0].length(); ++col) {
            char c = strs[0][col];
            for (size_t row = 1; row < strs.size(); ++row) {
                if (col >= strs[row].length() || strs[row][col] != c) {
                    return strs[0].substr(0, col);
                }
            }
        }
        return strs[0];
    }
};`,
    pythonSolution: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""
        prefix = strs[0]
        for s in strs[1:]:
            while not s.startswith(prefix):
                prefix = prefix[:-1]
                if not prefix:
                    return ""
        return prefix`,
    javaSolution: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`,
    edgeCases: ['Single string in array (prefix is the entire string)', 'Array contains an empty string ""', 'No characters match'],
    commonMistakes: ['Comparing horizontal pairs instead of vertical scanning, which does unnecessary work when common prefix is very short'],
    interviewExplanation:
      'Vertical scanning is optimal in the worst case (O(S)) and terminates early in O(minLen * n) when a mismatch appears early on.',
  },
  {
    id: 'reverse-words-in-a-string',
    number: 16,
    title: 'Reverse Words in a String',
    category: 'Strings',
    difficulty: 'Medium',
    description:
      'Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space. Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.',
    examples: [
      { input: 's = "the sky is blue"', output: '"blue is sky the"' },
      { input: 's = "  hello world  "', output: '"world hello"' },
      { input: 's = "a good   example"', output: '"example good a"' },
    ],
    constraints: ['1 <= s.length <= 10^4', 's contains English letters, digits, and spaces \' \'.'],
    keyConcepts: ['String Stream / Two Pointers', 'Tokenization', 'Trim Whitespace'],
    pattern: 'Reversal & Token Processing',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'Leading, trailing, and multiple spaces need to be reduced to single spaces.',
      'In C++, stringstream or two pointers can easily extract words ignoring extra whitespace.',
      'Extract words into a list and construct the result in reverse order, joined by a single space.',
    ],
    cppSolution: `#include <string>
#include <sstream>
#include <vector>

class Solution {
public:
    std::string reverseWords(const std::string& s) {
        std::stringstream ss(s);
        std::string word;
        std::vector<std::string> words;

        while (ss >> word) {
            words.push_back(word);
        }

        std::string result;
        for (int i = static_cast<int>(words.size()) - 1; i >= 0; --i) {
            result += words[i];
            if (i > 0) result += ' ';
        }
        return result;
    }
};`,
    pythonSolution: `class Solution:
    def reverseWords(self, s: str) -> str:
        return " ".join(reversed(s.split()))`,
    javaSolution: `class Solution {
    public String reverseWords(String s) {
        String[] parts = s.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = parts.length - 1; i >= 0; i--) {
            sb.append(parts[i]);
            if (i > 0) sb.append(" ");
        }
        return sb.toString();
    }
}`,
    edgeCases: ['All spaces string', 'Single word with leading/trailing spaces', 'Multiple spaces between words'],
    commonMistakes: ['Leaving a trailing space at the very end of the output string'],
    interviewExplanation:
      'In C++, std::stringstream automatically consumes variable whitespace. For strict in-place O(1) space, reverse the entire string, then reverse individual words, and shift characters to eliminate extra spaces.',
  },
  {
    id: 'first-unique-character',
    number: 17,
    title: 'First Unique Character in a String',
    category: 'Strings',
    difficulty: 'Easy',
    description:
      'Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.',
    examples: [
      { input: 's = "leetcode"', output: '0' },
      { input: 's = "loveleetcode"', output: '2' },
      { input: 's = "aabb"', output: '-1' },
    ],
    constraints: ['1 <= s.length <= 10^5', 's consists of only lowercase English letters.'],
    keyConcepts: ['Frequency Array', 'Two Pass Algorithm', 'O(1) Space'],
    pattern: 'Frequency Table / Counting',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) (26 characters)',
    hints: [
      'In the first pass, count the frequency of each character in an array of size 26.',
      'In the second pass, find the first character in s whose recorded frequency is 1.',
      'If no character has a frequency of 1, return -1.',
    ],
    cppSolution: `#include <string>

class Solution {
public:
    int firstUniqChar(const std::string& s) {
        int freq[26] = {0};
        for (char c : s) {
            freq[c - 'a']++;
        }
        for (int i = 0; i < static_cast<int>(s.length()); ++i) {
            if (freq[s[i] - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
};`,
    pythonSolution: `class Solution:
    def firstUniqChar(self, s: str) -> int:
        freq: dict[str, int] = {}
        for ch in s:
            freq[ch] = freq.get(ch, 0) + 1
        for i, ch in enumerate(s):
            if freq[ch] == 1:
                return i
        return -1`,
    javaSolution: `class Solution {
    public int firstUniqChar(String s) {
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
}`,
    edgeCases: ['All characters repeat (return -1)', 'Single character string (return 0)', 'Unique character is at the very end'],
    commonMistakes: ['Using an unordered_map which has hashing overhead when fixed array of 26 is much faster'],
    interviewExplanation:
      'A simple two-pass linear time algorithm: pass 1 counts frequencies in an O(1) fixed table, pass 2 identifies the first character with count == 1. Total time O(n), auxiliary space O(1).',
  },
  {
    id: 'longest-substring-without-repeating-characters',
    number: 18,
    title: 'Longest Substring Without Repeating Characters',
    category: 'Strings',
    difficulty: 'Medium',
    description:
      'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    keyConcepts: ['Sliding Window', 'Hash Map / Index Lookup', 'Dynamic Left Pointer'],
    pattern: 'Dynamic Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m)) where m is charset size',
    hints: [
      'Maintain a sliding window [left, right] of characters without duplicates.',
      'Store the most recent index where each character appeared in a hash map or direct-address table of size 128/256.',
      'When you see a character at right that already appeared at index idx >= left, jump left to idx + 1.',
    ],
    cppSolution: `#include <string>
#include <algorithm>
#include <vector>

class Solution {
public:
    int lengthOfLongestSubstring(const std::string& s) {
        std::vector<int> lastIndex(128, -1);
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < static_cast<int>(s.length()); ++right) {
            unsigned char c = static_cast<unsigned char>(s[right]);
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            lastIndex[c] = right;
            maxLen = std::max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};`,
    pythonSolution: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index: dict[str, int] = {}
        left = 0
        max_len = 0
        for right, ch in enumerate(s):
            if ch in char_index and char_index[ch] >= left:
                left = char_index[ch] + 1
            char_index[ch] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
    javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> charIndex = new HashMap<>();
        int left = 0;
        int maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            if (charIndex.containsKey(ch) && charIndex.get(ch) >= left) {
                left = charIndex.get(ch) + 1;
            }
            charIndex.put(ch, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
    edgeCases: ['Empty string (returns 0)', 'String with all identical characters (returns 1)', 'String with all distinct characters'],
    commonMistakes: [
      'Shrinking the window character-by-character with a while loop instead of jumping left directly to lastIndex[c] + 1',
      'Forgetting that characters can be spaces or symbols (size 128 or 256 vector is required)',
    ],
    interviewExplanation:
      'Use the optimized sliding window: store the last seen position of each character in an ASCII table. When a repeated character is encountered within the current window (lastIndex[c] >= left), jump left forward directly to lastIndex[c] + 1.',
  },
  {
    id: 'group-anagrams',
    number: 19,
    title: 'Group Anagrams',
    category: 'Strings',
    difficulty: 'Medium',
    description:
      'Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.',
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters.'],
    keyConcepts: ['Canonical Key', 'Hash Map', 'Categorization'],
    pattern: 'Canonical Signature Hashing',
    timeComplexity: 'O(n * k log k) where k is max string length',
    spaceComplexity: 'O(n * k)',
    hints: [
      'Two strings are anagrams if and only if their sorted versions are identical.',
      'Use the sorted string as a hash map key: unordered_map<string, vector<string>>.',
      'Iterate through all strings, sort each, and push the original string into the bucket corresponding to its sorted key.',
    ],
    cppSolution: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(const std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> map;
        for (const std::string& s : strs) {
            std::string key = s;
            std::sort(key.begin(), key.end());
            map[key].push_back(s);
        }

        std::vector<std::vector<std::string>> result;
        result.reserve(map.size());
        for (auto& pair : map) {
            result.push_back(std::move(pair.second));
        }
        return result;
    }
};`,
    pythonSolution: `class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups: dict[str, list[str]] = {}
        for s in strs:
            key = "".join(sorted(s))
            if key not in groups:
                groups[key] = []
            groups[key].append(s)
        return list(groups.values())`,
    javaSolution: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(groups.values());
    }
}`,
    edgeCases: ['Array containing empty strings ""', 'Single character strings', 'All strings are anagrams of one another'],
    commonMistakes: ['Using frequency count signature when simple sorting is much shorter, cleaner, and within constraints for k <= 100'],
    interviewExplanation:
      'Explain the concept of a canonical representation for an equivalence class: sorting each string yields a unique key for all its anagrams. For extremely long strings, a 26-count delimiter string (#1#0#2...) can reduce sorting overhead to O(k).',
  },
  {
    id: 'string-to-integer-atoi',
    number: 20,
    title: 'String to Integer (atoi)',
    category: 'Strings',
    difficulty: 'Medium',
    description:
      'Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer. The algorithm for myAtoi(string s) is as follows: 1. Ignore any leading whitespace. 2. Check if the next character is \'-\' or \'+\'. 3. Read in next the characters until the next non-digit character or end of input. 4. Clamp integer within [-2^31, 2^31 - 1]. Return 0 if no digits were read.',
    examples: [
      { input: 's = "42"', output: '42' },
      { input: 's = " -042"', output: '-42' },
      { input: 's = "1337c0d3"', output: '1337', explanation: 'Reading stops at \'c\'.' },
      { input: 's = "0-1"', output: '0', explanation: 'Reading stops at \'-\'.' },
      { input: 's = "words and 987"', output: '0' },
    ],
    constraints: ['0 <= s.length <= 200', 's consists of English letters, digits, \' \', \'+\', \'-\', and \'.\'.'],
    keyConcepts: ['State Machine / Simulation', 'Integer Overflow Clamping', 'Character Parsing'],
    pattern: 'Finite State Simulation & Overflow Handling',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Carefully follow the 4-step sequence: whitespace -> sign -> digit accumulation -> clamping.',
      'Check for 32-bit overflow before multiplying by 10 or adding the digit: if result > (INT_MAX - digit) / 10, clamp immediately.',
      'Handle sign correctly when clamping to INT_MAX or INT_MIN.',
    ],
    cppSolution: `#include <string>
#include <climits>
#include <cctype>

class Solution {
public:
    int myAtoi(const std::string& s) {
        int i = 0;
        int n = static_cast<int>(s.length());

        // 1. Skip leading whitespaces
        while (i < n && s[i] == ' ') i++;
        if (i == n) return 0;

        // 2. Determine sign
        int sign = 1;
        if (s[i] == '+' || s[i] == '-') {
            sign = (s[i] == '-') ? -1 : 1;
            i++;
        }

        // 3. Accumulate digits with overflow check
        int result = 0;
        while (i < n && std::isdigit(s[i])) {
            int digit = s[i] - '0';
            if (result > (INT_MAX - digit) / 10) {
                return (sign == 1) ? INT_MAX : INT_MIN;
            }
            result = result * 10 + digit;
            i++;
        }

        return result * sign;
    }
};`,
    pythonSolution: `class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.strip()
        if not s:
            return 0
        sign = 1
        i = 0
        if s[0] == '-':
            sign = -1
            i = 1
        elif s[0] == '+':
            i = 1
        res = 0
        INT_MAX = 2**31 - 1
        INT_MIN = -2**31
        while i < len(s) and s[i].isdigit():
            digit = int(s[i])
            res = res * 10 + digit
            if sign == 1 and res > INT_MAX:
                return INT_MAX
            if sign == -1 and -res < INT_MIN:
                return INT_MIN
            i += 1
        return sign * res`,
    javaSolution: `class Solution {
    public int myAtoi(String s) {
        if (s == null) return 0;
        s = s.trim();
        if (s.isEmpty()) return 0;

        int sign = 1;
        int i = 0;
        if (s.charAt(0) == '-') {
            sign = -1;
            i = 1;
        } else if (s.charAt(0) == '+') {
            i = 1;
        }

        long res = 0;
        while (i < s.length() && Character.isDigit(s.charAt(i))) {
            res = res * 10 + (s.charAt(i) - '0');
            if (sign == 1 && res > Integer.MAX_VALUE) {
                return Integer.MAX_VALUE;
            }
            if (sign == -1 && -res < Integer.MIN_VALUE) {
                return Integer.MIN_VALUE;
            }
            i++;
        }
        return (int) (sign * res);
    }
}`,
    edgeCases: ['Leading characters other than digits or sign', 'Empty string or only spaces', 'Numbers exceeding 2^31 - 1 or less than -2^31'],
    commonMistakes: ['Relying on long long which still overflows on 100-digit input; proactive overflow checking is mandatory'],
    interviewExplanation:
      'Walk through the edge cases methodically. Explain the proactive overflow condition: check if result > (INT_MAX - digit) / 10 before mutating result. This guarantees safe execution within 32-bit integer arithmetic without compiler undefined behavior.',
  },
];
