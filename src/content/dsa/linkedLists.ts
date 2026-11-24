import { DSAProblem } from '@/types/dsa';

export const linkedListsProblems: DSAProblem[] = [
  {
    id: 'reverse-linked-list',
    number: 44,
    title: 'Reverse Linked List',
    category: 'Linked Lists',
    difficulty: 'Easy',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    keyConcepts: ['Pointer Manipulation', 'Iterative vs Recursive', 'Prev / Curr / Next'],
    pattern: 'Three-Pointer Reversal',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Maintain three pointers: prev (initially nullptr), curr (initially head), and next.',
      'Before rewiring curr->next to prev, remember to save the next node: next = curr->next.',
      'Advance prev to curr, and curr to next. When curr reaches nullptr, prev points to the new head.',
    ],
    cppSolution: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;

        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }

        return prev;
    }
};`,
    pythonSolution: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
from typing import Optional

class Solution:
    def reverseList(self, head: Optional['ListNode']) -> Optional['ListNode']:
        prev = None
        curr = head
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        return prev`,
    javaSolution: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }

        return prev;
    }
}`,
    edgeCases: ['Empty list (head == nullptr)', 'Single-node list', 'Two-node list'],
    commonMistakes: ['Losing the reference to curr->next before reversing the pointer'],
    interviewExplanation:
      'Explain the iterative three-pointer technique (prev, curr, nextTemp). Mention that while recursive reversal is also possible in O(n) time, iterative uses O(1) space, avoiding stack overflow on long lists.',
  },
  {
    id: 'middle-of-linked-list',
    number: 45,
    title: 'Middle of the Linked List',
    category: 'Linked Lists',
    difficulty: 'Easy',
    description:
      'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[3,4,5]',
        explanation: 'The middle node of the list is node 3.',
      },
      {
        input: 'head = [1,2,3,4,5,6]',
        output: '[4,5,6]',
        explanation: 'Since the list has two middle nodes with values 3 and 4, we return the second one.',
      },
    ],
    constraints: ['The number of nodes in the list is in the range [1, 100].', '1 <= Node.val <= 100'],
    keyConcepts: ['Fast and Slow Pointers', 'Tortoise and Hare', 'Single-pass traversal'],
    pattern: 'Fast & Slow Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Initialize slow and fast pointers at head.',
      'In each step, move slow forward by 1 node, and fast forward by 2 nodes.',
      'When fast reaches the end (fast == nullptr || fast->next == nullptr), slow is guaranteed to be at the middle node.',
    ],
    cppSolution: `class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        return slow;
    }
};`,
    pythonSolution: `from typing import Optional

class Solution:
    def middleNode(self, head: Optional['ListNode']) -> Optional['ListNode']:
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow`,
    javaSolution: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}`,
    edgeCases: ['Single-node list (returns head)', 'Even number of nodes (returns second middle)', 'Odd number of nodes'],
    commonMistakes: ['Checking fast->next->next before checking fast->next != nullptr causing null pointer dereference'],
    interviewExplanation:
      'Fast moves at 2x the speed of slow. When fast completes distance d, slow has completed d/2. For even lengths, starting fast at head naturally lands slow at the second middle node.',
  },
  {
    id: 'merge-two-sorted-lists',
    number: 46,
    title: 'Merge Two Sorted Lists',
    category: 'Linked Lists',
    difficulty: 'Easy',
    description:
      'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' },
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order.'],
    keyConcepts: ['Dummy Head', 'Pointer Splicing', 'Linear Merge'],
    pattern: 'Dummy Node & Linear Merge',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    hints: [
      'Create a dummy node (ListNode dummy(0)) on the stack to simplify head attachment.',
      'Compare list1->val and list2->val. Attach the smaller node to tail->next, and advance that list pointer.',
      'Once one list is exhausted, attach the remainder of the other list directly in O(1).',
    ],
    cppSolution: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }

        // Attach whichever list has remaining nodes
        tail->next = (list1 != nullptr) ? list1 : list2;

        return dummy.next;
    }
};`,
    pythonSolution: `from typing import Optional

class Solution:
    def mergeTwoLists(self, list1: Optional['ListNode'], list2: Optional['ListNode']) -> Optional['ListNode']:
        dummy = ListNode(0)
        tail = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        tail.next = list1 if list1 else list2
        return dummy.next`,
    javaSolution: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,
    edgeCases: ['One list is empty', 'Both lists are empty', 'Lists of completely different lengths or disjoint values'],
    commonMistakes: ['Iterating through the remainder of the non-empty list node-by-node instead of attaching it in one O(1) pointer assignment'],
    interviewExplanation:
      'Using a stack-allocated dummy node eliminates special-case logic for initializing the new head pointer. Splicing existing nodes in-place guarantees O(1) auxiliary memory.',
  },
  {
    id: 'linked-list-cycle',
    number: 47,
    title: 'Linked List Cycle',
    category: 'Linked Lists',
    difficulty: 'Easy',
    description:
      'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list. Otherwise, return false.',
    examples: [
      {
        input: 'head = [3,2,0,-4], pos = 1',
        output: 'true',
        explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).',
      },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' },
    ],
    constraints: ['The number of the nodes in the list is in the range [0, 10^4].', '-10^5 <= Node.val <= 10^5', 'pos is -1 or a valid index in the linked-list.'],
    keyConcepts: ["Floyd's Tortoise and Hare", 'Cycle Detection', 'O(1) Memory'],
    pattern: "Floyd's Cycle Finding",
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'A hash set takes O(n) space. How can you detect a cycle using O(1) space?',
      'Imagine two runners on a circular track: one running at speed 1, the other running at speed 2.',
      'If a cycle exists, the fast runner will eventually catch up and meet the slow runner. If no cycle exists, fast reaches nullptr.',
    ],
    cppSolution: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (!head || !head->next) return false;

        ListNode* slow = head;
        ListNode* fast = head;

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
};`,
    pythonSolution: `from typing import Optional

class Solution:
    def hasCycle(self, head: Optional['ListNode']) -> bool:
        if not head or not head.next:
            return False

        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True

        return False`,
    javaSolution: `class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}`,
    edgeCases: ['Empty list', 'Single node pointing to nullptr', 'Single node pointing to itself'],
    commonMistakes: ['Comparing slow->val == fast->val instead of comparing pointer memory addresses slow == fast'],
    interviewExplanation:
      'Explain Floyd\'s Cycle-Finding Algorithm. In each iteration inside the loop, the relative distance between fast and slow decreases by 1 node. Therefore, if a cycle of length C exists, they will meet in at most C steps.',
  },
  {
    id: 'remove-nth-node-from-end',
    number: 48,
    title: 'Remove Nth Node From End of List',
    category: 'Linked Lists',
    difficulty: 'Medium',
    description:
      'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', output: '[]' },
      { input: 'head = [1,2], n = 1', output: '[1]' },
    ],
    constraints: ['The number of nodes in the list is sz.', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    keyConcepts: ['Dummy Head', 'Two-Pointer Gap Offset', 'Single-pass Traversal'],
    pattern: 'Offset Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: [
      'Can you do this in one pass? Maintain a gap of n nodes between fast and slow pointers.',
      'Use a dummy node pointing to head to handle removing the head node cleanly.',
      'Advance fast by n + 1 steps. Then move both fast and slow together until fast is nullptr. Slow will now be right before the target node to delete!',
    ],
    cppSolution: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0);
        dummy.next = head;

        ListNode* fast = &dummy;
        ListNode* slow = &dummy;

        // Advance fast by n + 1 steps to create gap
        for (int i = 0; i <= n; ++i) {
            fast = fast->next;
        }

        // Move both together until fast reaches the end
        while (fast != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }

        // Delete target node
        ListNode* nodeToDelete = slow->next;
        slow->next = slow->next->next;
        delete nodeToDelete; // Proper C++ memory cleanup

        return dummy.next;
    }
};`,
    pythonSolution: `from typing import Optional

class Solution:
    def removeNthFromEnd(self, head: Optional['ListNode'], n: int) -> Optional['ListNode']:
        dummy = ListNode(0, head)
        fast = dummy
        slow = dummy

        for _ in range(n + 1):
            fast = fast.next

        while fast:
            fast = fast.next
            slow = slow.next

        slow.next = slow.next.next
        return dummy.next`,
    javaSolution: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy;
        ListNode slow = dummy;

        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }

        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
    edgeCases: ['Removing the head of the list (handled gracefully by dummy node)', 'List of length 1', 'Removing the tail node (n = 1)'],
    commonMistakes: ['Failing to free deleted node in C++, causing memory leaks in interview discussions'],
    interviewExplanation:
      'By advancing fast by n + 1 nodes from a dummy node, slow lands exactly one node before the node to be removed. Re-link slow->next = slow->next->next and delete the target node in a single pass.',
  },
];
