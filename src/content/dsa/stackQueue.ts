import { DSAProblem } from '@/types/dsa';

export const stackQueueProblems: DSAProblem[] = [
  {
    id: 'valid-parentheses',
    number: 49,
    title: 'Valid Parentheses',
    category: 'Stack & Queue',
    difficulty: 'Easy',
    description:
      'Verify whether an input string containing only parenthesis characters (), {}, and [] has balanced, properly ordered brackets.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only: ()[]{}'],
    keyConcepts: ['LIFO Matching', 'Stack Data Structure', 'Early Exit on Odd Length'],
    pattern: 'Stack Matching',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'An odd length string can never be valid.',
      'Push opening brackets onto a stack. When a closing bracket is encountered, verify the top of the stack matches its corresponding pair.',
      'Return true only if the stack is completely empty at the end.',
    ],
    cppSolution: `#include <string>
#include <stack>

class Solution {
public:
    bool isValid(const std::string& s) {
        if (s.length() % 2 != 0) return false;

        std::stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }

        return st.empty();
    }
};`,
    edgeCases: ['Single closing bracket at start', 'Stack non-empty at end', 'Odd length input'],
    commonMistakes: ['Calling st.top() when st is empty causing undefined behavior or segmentation fault'],
    interviewExplanation:
      'LIFO stack structure naturally models nested matched pairs. Pushing the expected closing bracket simplifies matching checks to a direct equality comparison.',
  },
  {
    id: 'min-stack',
    number: 50,
    title: 'Min Stack',
    category: 'Stack & Queue',
    difficulty: 'Medium',
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in constant O(1) time.',
    examples: [
      {
        input: 'MinStack st; st.push(-2); st.push(0); st.push(-3); st.getMin(); st.pop(); st.top(); st.getMin();',
        output: 'getMin() -> -3, top() -> 0, getMin() -> -2',
      },
    ],
    constraints: ['Methods called at most 3 * 10^4 times', 'pop, top, getMin always called on non-empty stack'],
    keyConcepts: ['Auxiliary Min Stack', 'Value-Min Pairs', 'O(1) Retrieval'],
    pattern: 'Dual Stack / Augmented Node',
    timeComplexity: 'O(1) for all operations',
    spaceComplexity: 'O(n)',
    hints: [
      'Each element in the stack can track the minimum element present at or below its own depth.',
      'You can maintain a primary stack and a parallel minStack, or store pairs of (value, currentMin).',
      'When pushing x, the new minimum is min(x, currentMin).',
    ],
    cppSolution: `#include <stack>
#include <algorithm>

class MinStack {
private:
    std::stack<int> mainStack;
    std::stack<int> minStack;

public:
    MinStack() {}

    void push(int val) {
        mainStack.push(val);
        int currentMin = minStack.empty() ? val : std::min(val, minStack.top());
        minStack.push(currentMin);
    }

    void pop() {
        mainStack.pop();
        minStack.pop();
    }

    int top() {
        return mainStack.top();
    }

    int getMin() {
        return minStack.top();
    }
};`,
    edgeCases: ['Pushing duplicate minimum values', 'Removing the current minimum element', 'Single element stack'],
    commonMistakes: ['Only storing a single min variable, which is lost when the minimum element is popped'],
    interviewExplanation:
      'Pairing each stack frame with the running minimum preserves historical minimums as elements are popped, satisfying strict O(1) time for getMin().',
  },
  {
    id: 'implement-queue-using-stacks',
    number: 51,
    title: 'Implement Queue using Stacks',
    category: 'Stack & Queue',
    difficulty: 'Easy',
    description:
      'Implement a first in first out (FIFO) queue using only two standard LIFO stacks.',
    examples: [
      {
        input: 'MyQueue q; q.push(1); q.push(2); q.peek(); q.pop(); q.empty();',
        output: 'peek() -> 1, pop() -> 1, empty() -> false',
      },
    ],
    constraints: ['Calls at most 100 times', 'All calls to pop and peek are valid'],
    keyConcepts: ['Amortized Analysis', 'In-Stack & Out-Stack', 'FIFO Transformation'],
    pattern: 'Two-Stack Inversion',
    timeComplexity: 'O(1) amortized for pop/peek, O(1) for push',
    spaceComplexity: 'O(n)',
    hints: [
      'One stack handles incoming elements (inStack), the other handles outgoing elements (outStack).',
      'When pop or peek is called and outStack is empty, transfer all elements from inStack to outStack to reverse their order.',
      'Each element is pushed and popped at most twice across its lifetime, yielding O(1) amortized cost.',
    ],
    cppSolution: `#include <stack>

class MyQueue {
private:
    std::stack<int> inStack;
    std::stack<int> outStack;

    void transferIfEmpty() {
        if (outStack.empty()) {
            while (!inStack.empty()) {
                outStack.push(inStack.top());
                inStack.pop();
            }
        }
    }

public:
    MyQueue() {}

    void push(int x) {
        inStack.push(x);
    }

    int pop() {
        transferIfEmpty();
        int val = outStack.top();
        outStack.pop();
        return val;
    }

    int peek() {
        transferIfEmpty();
        return outStack.top();
    }

    bool empty() {
        return inStack.empty() && outStack.empty();
    }
};`,
    edgeCases: ['Interleaved push and pop calls', 'Multiple consecutive peek calls without pop'],
    commonMistakes: ['Transferring elements back and forth on every operation, degrading time to O(n) per call'],
    interviewExplanation:
      'Lazy transfer is optimal: only move elements to outStack when outStack is empty. This guarantees each element moves at most twice, achieving O(1) amortized runtime.',
  },
  {
    id: 'daily-temperatures',
    number: 52,
    title: 'Daily Temperatures',
    category: 'Stack & Queue',
    difficulty: 'Medium',
    description:
      'Given an array of daily temperatures, compute for each day how many days you would have to wait until a warmer temperature occurs. If no future day is warmer, output 0.',
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    keyConcepts: ['Monotonic Decreasing Stack', 'Index Difference Tracking', 'Linear Scan'],
    pattern: 'Monotonic Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: [
      'Store indices of temperatures in a monotonic stack where values decrease from bottom to top.',
      'When the current day temperature exceeds the temperature at st.top(), resolve that previous day: result[prevIdx] = currentIdx - prevIdx.',
      'Pop resolved indices until the stack invariant is restored, then push current index.',
    ],
    cppSolution: `#include <vector>
#include <stack>

class Solution {
public:
    std::vector<int> dailyTemperatures(const std::vector<int>& temperatures) {
        int n = static_cast<int>(temperatures.size());
        std::vector<int> answer(n, 0);
        std::stack<int> st; // Stores indices

        for (int i = 0; i < n; ++i) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prev = st.top();
                st.pop();
                answer[prev] = i - prev;
            }
            st.push(i);
        }

        return answer;
    }
};`,
    edgeCases: ['Strictly decreasing temperatures (all 0s)', 'Strictly increasing temperatures (all 1s except last)', 'Plateau temperatures'],
    commonMistakes: ['Storing temperatures instead of indices in the stack; storing indices gives both value and distance'],
    interviewExplanation:
      'A monotonic decreasing stack keeps unresolved days waiting for a warmer temperature. Each index is pushed and popped at most once, giving an optimal O(n) linear solution.',
  },
  {
    id: 'next-greater-element-i',
    number: 53,
    title: 'Next Greater Element I',
    category: 'Stack & Queue',
    difficulty: 'Easy',
    description:
      'Find the first greater element to the right for each number in subset nums1 based on its position in nums2. If none exists, output -1.',
    examples: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' },
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]' },
    ],
    constraints: ['1 <= nums1.length <= nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 10^4', 'All integers in nums1 and nums2 are unique.'],
    keyConcepts: ['Monotonic Stack', 'Hash Map Lookup', 'Rightward Scan'],
    pattern: 'Monotonic Stack + Hash Map',
    timeComplexity: 'O(nums1.length + nums2.length)',
    spaceComplexity: 'O(nums2.length)',
    hints: [
      'Precompute the next greater element for every number in nums2 using a monotonic stack.',
      'Store each mapping: number -> nextGreater in an unordered_map.',
      'Iterate through nums1 and perform O(1) lookups in your precomputed map.',
    ],
    cppSolution: `#include <vector>
#include <stack>
#include <unordered_map>

class Solution {
public:
    std::vector<int> nextGreaterElement(const std::vector<int>& nums1, const std::vector<int>& nums2) {
        std::unordered_map<int, int> nextGreater;
        std::stack<int> st;

        for (int num : nums2) {
            while (!st.empty() && num > st.top()) {
                nextGreater[st.top()] = num;
                st.pop();
            }
            st.push(num);
        }

        std::vector<int> result;
        result.reserve(nums1.size());
        for (int num : nums1) {
            auto it = nextGreater.find(num);
            result.push_back(it != nextGreater.end() ? it->second : -1);
        }

        return result;
    }
};`,
    edgeCases: ['Element is the largest in nums2 (maps to -1)', 'nums1 identical to nums2'],
    commonMistakes: ['Searching linearly in nums2 for every element in nums1, which causes O(nums1 * nums2) runtime'],
    interviewExplanation:
      'Use a monotonic stack to compute the next greater element for all items in nums2 in a single O(n) pass, caching answers in a hash map for O(1) queries.',
  },
];
