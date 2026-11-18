import { DSAProblem } from '@/types/dsa';

export const hashingProblems: DSAProblem[] = [
  {
    id: 'top-k-frequent-elements',
    number: 21,
    title: 'Top K Frequent Elements',
    category: 'Hashing',
    difficulty: 'Medium',
    description:
      'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Your algorithm\'s time complexity must be better than O(n log n), where n is the array\'s size.',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, the number of unique elements in the array].', 'It is guaranteed that the answer is unique.'],
    keyConcepts: ['Bucket Sort', 'Frequency Map', 'Min-Heap Alternative'],
    pattern: 'Bucket Sort / Frequency Inversion',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'First count the frequencies of all numbers using an unordered_map.',
      'Since the maximum possible frequency is n, you can create an array of buckets where bucket[f] holds all numbers with frequency f.',
      'Iterate backwards from bucket n down to 1 and collect elements until you have k elements.',
    ],
    cppSolution: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> topKFrequent(const std::vector<int>& nums, int k) {
        std::unordered_map<int, int> freq;
        for (int num : nums) {
            freq[num]++;
        }

        int n = static_cast<int>(nums.size());
        std::vector<std::vector<int>> buckets(n + 1);
        for (const auto& [num, count] : freq) {
            buckets[count].push_back(num);
        }

        std::vector<int> result;
        for (int i = n; i >= 1 && static_cast<int>(result.size()) < k; --i) {
            for (int num : buckets[i]) {
                result.push_back(num);
                if (static_cast<int>(result.size()) == k) break;
            }
        }
        return result;
    }
};`,
    edgeCases: ['All elements have the same frequency', 'k == number of unique elements', 'Negative numbers'],
    commonMistakes: ['Using standard std::sort on the frequency map which takes O(n log n), violating the better-than-O(n log n) constraint'],
    interviewExplanation:
      'Compare Min-Heap of size k (O(n log k)) with Bucket Sort (O(n) linear time). Highlight that because frequencies are bounded by array length n, Bucket Sort achieves strict O(n) runtime.',
  },
  {
    id: 'longest-consecutive-sequence',
    number: 22,
    title: 'Longest Consecutive Sequence',
    category: 'Hashing',
    difficulty: 'Medium',
    description:
      'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.',
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
    ],
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    keyConcepts: ['Hash Set', 'Sequence Start Identification', 'O(n) Amortized Traversal'],
    pattern: 'Hash Set Sequence Expansion',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'Sorting takes O(n log n). How can you check for adjacent elements in O(1)? Put all numbers into an unordered_set.',
      'Only start counting a sequence if num is the beginning of a sequence. How do you know? If num - 1 is NOT in the set!',
      'Once a sequence start is found, count upwards (num + 1, num + 2...) while the set contains them.',
    ],
    cppSolution: `#include <vector>
#include <unordered_set>
#include <algorithm>

class Solution {
public:
    int longestConsecutive(const std::vector<int>& nums) {
        std::unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;

        for (int num : numSet) {
            // Only start count if num is the start of a streak
            if (numSet.find(num - 1) == numSet.end()) {
                int currentNum = num;
                int currentStreak = 1;

                while (numSet.find(currentNum + 1) != numSet.end()) {
                    currentNum++;
                    currentStreak++;
                }

                longest = std::max(longest, currentStreak);
            }
        }

        return longest;
    }
};`,
    edgeCases: ['Empty array (returns 0)', 'Array with all duplicate values', 'Negative and positive numbers'],
    commonMistakes: ['Checking sequences from every number, causing O(n^2) time on sequences like [1, 2, 3, 4, 5]'],
    interviewExplanation:
      'The critical optimization is checking `if (!numSet.count(num - 1))`. This ensures inner while loops execute at most once per element across the entire run, guaranteeing overall O(n) linear time.',
  },
  {
    id: 'ransom-note',
    number: 23,
    title: 'Ransom Note',
    category: 'Hashing',
    difficulty: 'Easy',
    description:
      'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise. Each letter in magazine can only be used once in ransomNote.',
    examples: [
      { input: 'ransomNote = "a", magazine = "b"', output: 'false' },
      { input: 'ransomNote = "aa", magazine = "ab"', output: 'false' },
      { input: 'ransomNote = "aa", magazine = "aab"', output: 'true' },
    ],
    constraints: ['1 <= ransomNote.length, magazine.length <= 10^5', 'ransomNote and magazine consist of lowercase English letters.'],
    keyConcepts: ['Frequency Array', 'Inventory Check', 'O(1) Space'],
    pattern: 'Frequency Table / Counting',
    timeComplexity: 'O(m + n) where m is magazine length, n is ransom note length',
    spaceComplexity: 'O(1) (26 characters)',
    hints: [
      'Early exit: if ransomNote.length() > magazine.length(), return false immediately.',
      'Count character frequencies available in magazine using an int count[26] array.',
      'Iterate over ransomNote and decrement available letters; if any count drops below zero, return false.',
    ],
    cppSolution: `#include <string>

class Solution {
public:
    bool canConstruct(const std::string& ransomNote, const std::string& magazine) {
        if (ransomNote.length() > magazine.length()) return false;

        int counts[26] = {0};
        for (char c : magazine) {
            counts[c - 'a']++;
        }

        for (char c : ransomNote) {
            if (--counts[c - 'a'] < 0) {
                return false;
            }
        }

        return true;
    }
};`,
    edgeCases: ['ransomNote longer than magazine', 'All characters available in excess', 'Repeated required letters'],
    commonMistakes: ['Using an expensive hash map when a stack-allocated 26-element integer array is faster'],
    interviewExplanation:
      'Treat magazine as an inventory table. Build the 26-int frequency table in O(magazine.length), then consume inventory in O(ransomNote.length).',
  },
  {
    id: 'isomorphic-strings',
    number: 24,
    title: 'Isomorphic Strings',
    category: 'Hashing',
    difficulty: 'Easy',
    description:
      'Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t. All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.',
    examples: [
      { input: 's = "egg", t = "add"', output: 'true' },
      { input: 's = "foo", t = "bar"', output: 'false' },
      { input: 's = "paper", t = "title"', output: 'true' },
    ],
    constraints: ['1 <= s.length <= 5 * 10^4', 't.length == s.length', 's and t consist of any valid ASCII character.'],
    keyConcepts: ['Bijection (1-to-1 Mapping)', 'Dual Mapping / Last Seen Positions'],
    pattern: 'Bijective Character Mapping',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) (256 ASCII characters)',
    hints: [
      'A bijection requires two conditions: each char in s maps to a unique char in t, and each char in t maps to a unique char in s.',
      'You can maintain two maps: sToT and tToS.',
      'Alternatively, compare the last seen positions of s[i] and t[i]. If their last seen indices ever differ, they are not isomorphic!',
    ],
    cppSolution: `#include <string>
#include <vector>

class Solution {
public:
    bool isIsomorphic(const std::string& s, const std::string& t) {
        if (s.length() != t.length()) return false;

        // Store last seen positions (1-indexed to differentiate from unvisited 0)
        int lastSeenS[256] = {0};
        int lastSeenT[256] = {0};

        for (size_t i = 0; i < s.length(); ++i) {
            unsigned char cs = static_cast<unsigned char>(s[i]);
            unsigned char ct = static_cast<unsigned char>(t[i]);

            if (lastSeenS[cs] != lastSeenT[ct]) {
                return false;
            }

            lastSeenS[cs] = static_cast<int>(i + 1);
            lastSeenT[ct] = static_cast<int>(i + 1);
        }

        return true;
    }
};`,
    edgeCases: ['Characters mapping to themselves', 'Two characters in s mapping to the same character in t', 'ASCII non-letter characters'],
    commonMistakes: ['Only checking one-way mapping s -> t without verifying uniqueness from t -> s'],
    interviewExplanation:
      'Explain that isomorphic relationship is a mathematical bijection. Recording the 1-indexed last seen position of both characters ensures identical structural patterns with zero allocations.',
  },
  {
    id: 'word-pattern',
    number: 25,
    title: 'Word Pattern',
    category: 'Hashing',
    difficulty: 'Easy',
    description:
      'Given a pattern and a string s, find if s follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.',
    examples: [
      { input: 'pattern = "abba", s = "dog cat cat dog"', output: 'true' },
      { input: 'pattern = "abba", s = "dog cat cat fish"', output: 'false' },
      { input: 'pattern = "aaaa", s = "dog cat cat dog"', output: 'false' },
    ],
    constraints: ['1 <= pattern.length <= 300', '1 <= s.length <= 3000', 'pattern contains only lower-case English letters.', 's contains only lowercase English letters and spaces \' \'.'],
    keyConcepts: ['String Stream', 'Bijective Mapping', 'Count Mismatch'],
    pattern: 'Bijective Hash Mapping',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(w) where w is number of unique words',
    hints: [
      'First tokenize s into a list of words using stringstream.',
      'If the number of words does not equal the length of pattern, return false immediately.',
      'Maintain two maps: pattern char -> word, and word -> pattern char, to enforce bidirectional 1-to-1 matching.',
    ],
    cppSolution: `#include <string>
#include <vector>
#include <sstream>
#include <unordered_map>

class Solution {
public:
    bool wordPattern(const std::string& pattern, const std::string& s) {
        std::stringstream ss(s);
        std::string word;
        std::vector<std::string> words;

        while (ss >> word) {
            words.push_back(word);
        }

        if (words.size() != pattern.length()) {
            return false;
        }

        std::unordered_map<char, std::string> charToWord;
        std::unordered_map<std::string, char> wordToChar;

        for (size_t i = 0; i < pattern.length(); ++i) {
            char c = pattern[i];
            const std::string& w = words[i];

            if (charToWord.count(c) && charToWord[c] != w) return false;
            if (wordToChar.count(w) && wordToChar[w] != c) return false;

            charToWord[c] = w;
            wordToChar[w] = c;
        }

        return true;
    }
};`,
    edgeCases: ['Word count != pattern character count', 'Different pattern characters mapping to identical word', 'Pattern of length 1'],
    commonMistakes: ['Only checking charToWord mapping, which falsely returns true for pattern="ab", s="dog dog"'],
    interviewExplanation:
      'Emphasize the bidirectional requirement: both charToWord and wordToChar must remain consistent. Early exit if tokenized word count differs from pattern length.',
  },
];
