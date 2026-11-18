import { DSAProblem } from '@/types/dsa';

export const treesBSTProblems: DSAProblem[] = [
  {
    id: 'maximum-depth',
    number: 54,
    title: 'Maximum Depth of Binary Tree',
    category: 'Trees & BST',
    difficulty: 'Easy',
    description:
      'Given the root of a binary tree, return its maximum depth, defined as the number of nodes along the longest path from root down to the farthest leaf.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
    keyConcepts: ['Depth First Search (DFS)', 'Tree Recursion', 'Post-order Traversal'],
    pattern: 'Divide and Conquer Tree DFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) where h is tree height',
    hints: [
      'If the node is null, its depth is 0.',
      'Recursively find the max depth of the left subtree and right subtree.',
      'The current depth is 1 + max(leftDepth, rightDepth).',
    ],
    cppSolution: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * };
 */
#include <algorithm>

class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + std::max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
    edgeCases: ['Empty tree (returns 0)', 'Single-node tree (returns 1)', 'Skewed tree (degenerates to linked list)'],
    commonMistakes: ['Forgetting base case null check causing segfault'],
    interviewExplanation:
      'Post-order traversal computes child heights bottom-up. Recursion stack takes O(h) space, where h = log n in balanced trees and O(n) in worst-case skewed trees.',
  },
  {
    id: 'invert-binary-tree',
    number: 55,
    title: 'Invert Binary Tree',
    category: 'Trees & BST',
    difficulty: 'Easy',
    description:
      'Given the root of a binary tree, invert the tree by swapping the left and right children of every node, and return its root.',
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    keyConcepts: ['Tree Inversion / Mirror', 'Recursive Swap', 'Pre/Post-order Traversal'],
    pattern: 'Tree Traversal with Mutation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) recursion stack',
    hints: [
      'For any node, swap its left and right pointers: std::swap(root->left, root->right).',
      'Recursively invert the left subtree and right subtree.',
      'Base case: if root is null, return nullptr.',
    ],
    cppSolution: `#include <algorithm>

class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;

        std::swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);

        return root;
    }
};`,
    edgeCases: ['Empty tree', 'Single node', 'Asymmetric / unbalanced tree'],
    commonMistakes: ['Recursing before swapping without caching pointers if swapping left/right individually'],
    interviewExplanation:
      'Every node is visited once and its two child pointers are swapped. Can be done via pre-order, post-order, or BFS queue with O(n) time and O(h) space.',
  },
  {
    id: 'level-order-traversal',
    number: 56,
    title: 'Binary Tree Level Order Traversal',
    category: 'Trees & BST',
    difficulty: 'Medium',
    description:
      'Given the root of a binary tree, return the level order traversal of its nodes values as a list of lists (from left to right, level by level).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
    keyConcepts: ['Breadth-First Search (BFS)', 'FIFO Queue', 'Level Sizing'],
    pattern: 'BFS with Level Boundary',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n) (max breadth)',
    hints: [
      'Use a standard queue for breadth-first traversal.',
      'To separate nodes by level, capture `int levelSize = q.size()` at the beginning of each level iteration.',
      'Loop `levelSize` times to dequeue all nodes belonging strictly to the current level before processing their children.',
    ],
    cppSolution: `#include <vector>
#include <queue>

class Solution {
public:
    std::vector<std::vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};

        std::vector<std::vector<int>> result;
        std::queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            int levelSize = static_cast<int>(q.size());
            std::vector<int> currentLevel;
            currentLevel.reserve(levelSize);

            for (int i = 0; i < levelSize; ++i) {
                TreeNode* node = q.front();
                q.pop();
                currentLevel.push_back(node->val);

                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }

            result.push_back(std::move(currentLevel));
        }

        return result;
    }
};`,
    edgeCases: ['Empty tree (returns empty 2D vector)', 'Skewed tree (single node per level)', 'Full binary tree'],
    commonMistakes: ['Calling q.size() inside the inner loop condition, which changes as children are pushed'],
    interviewExplanation:
      'Snapping `q.size()` prior to the inner loop cleanly delineates each level of the tree. Maximum queue size occurs at the leaf level, taking at most O(n/2) = O(n) space.',
  },
  {
    id: 'validate-bst',
    number: 57,
    title: 'Validate Binary Search Tree',
    category: 'Trees & BST',
    difficulty: 'Medium',
    description:
      'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST requires all left subtree values to be strictly less, and all right subtree values to be strictly greater than the node value.',
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'The root node value is 5, but its right child has value 4.' },
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
    keyConcepts: ['Range Bounds Propagation', 'In-order Traversal Monotonicity', '64-bit Range Bounds'],
    pattern: 'Range Propagation / In-order Validation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) recursion stack',
    hints: [
      'It is NOT sufficient to only check root->val > root->left->val and root->val < root->right->val. Every node in the left subtree must be less than root.',
      'Pass valid numerical bounds (minAllowed, maxAllowed) down the recursion.',
      'For the left child, update the upper bound: (minAllowed, root->val). For the right child, update the lower bound: (root->val, maxAllowed).',
    ],
    cppSolution: `#include <climits>

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }

private:
    bool validate(TreeNode* node, long long minVal, long long maxVal) {
        if (!node) return true;

        if (node->val <= minVal || node->val >= maxVal) {
            return false;
        }

        return validate(node->left, minVal, node->val) &&
               validate(node->right, node->val, maxVal);
    }
};`,
    edgeCases: ['Node values equal to INT_MAX or INT_MIN (use long long bounds to prevent overflow)', 'Duplicate values (invalid in strict BST)'],
    commonMistakes: ['Only validating immediate children rather than subtrees as a whole'],
    interviewExplanation:
      'Explain why local checks fail: a right child of a left subtree might be smaller than its parent but larger than the root ancestor. Propagating [minVal, maxVal] enforces the global invariant.',
  },
  {
    id: 'lowest-common-ancestor-of-bst',
    number: 58,
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    category: 'Trees & BST',
    difficulty: 'Medium',
    description:
      'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q in the BST.',
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'LCA of 2 and 8 is 6.' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explanation: 'LCA of 2 and 4 is 2 since a node can be an ancestor of itself.' },
    ],
    constraints: ['The number of nodes in the tree is in the range [2, 10^5].', 'All Node.val are unique.', 'p and q are different and both exist in the BST.'],
    keyConcepts: ['BST Ordering Property', 'Split Point Identification', 'O(1) Iterative Search'],
    pattern: 'BST Search Traversal',
    timeComplexity: 'O(h) where h is tree height',
    spaceComplexity: 'O(1) iterative',
    hints: [
      'Leverage the BST property: left < root < right.',
      'If both p and q have values strictly less than root->val, LCA must be in the left subtree.',
      'If both p and q have values strictly greater than root->val, LCA must be in the right subtree. The first node where p and q split (or one equals root) is the LCA!',
    ],
    cppSolution: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        TreeNode* curr = root;

        while (curr != nullptr) {
            if (p->val < curr->val && q->val < curr->val) {
                curr = curr->left;
            } else if (p->val > curr->val && q->val > curr->val) {
                curr = curr->right;
            } else {
                // Split point found: either p and q lie on different sides,
                // or one of them is equal to curr.
                return curr;
            }
        }

        return nullptr;
    }
};`,
    edgeCases: ['p is the parent of q (or vice-versa)', 'p and q are on opposite sides of root', 'Tree is degenerate line'],
    commonMistakes: ['Using standard binary tree LCA traversal (O(n)) when BST property permits O(h) direct descent'],
    interviewExplanation:
      'Because of BST ordering, we can guide our search deterministically. If both target values lie to one side, descend that way. The first node where their paths diverge is the LCA.',
  },
  {
    id: 'diameter-of-binary-tree',
    number: 59,
    title: 'Diameter of Binary Tree',
    category: 'Trees & BST',
    difficulty: 'Easy',
    description:
      'Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree, measured by the number of edges.',
    examples: [
      { input: 'root = [1,2,3,4,5]', output: '3', explanation: '3 is the length of path [4,2,1,3] or [5,2,1,3].' },
      { input: 'root = [1,2]', output: '1' },
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-100 <= Node.val <= 100'],
    keyConcepts: ['Post-order Traversal', 'Subtree Height', 'Global Max Update'],
    pattern: 'Bottom-Up Height DFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) recursion stack',
    hints: [
      'The longest path passing through any node as its highest point is leftHeight + rightHeight.',
      'Write a helper function that returns the height of a subtree.',
      'Inside the helper, update a global maxDiameter = max(maxDiameter, leftHeight + rightHeight), and return 1 + max(leftHeight, rightHeight).',
    ],
    cppSolution: `#include <algorithm>

class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        int maxDiameter = 0;
        height(root, maxDiameter);
        return maxDiameter;
    }

private:
    int height(TreeNode* node, int& maxDiameter) {
        if (!node) return 0;

        int leftH = height(node->left, maxDiameter);
        int rightH = height(node->right, maxDiameter);

        maxDiameter = std::max(maxDiameter, leftH + rightH);

        return 1 + std::max(leftH, rightH);
    }
};`,
    edgeCases: ['Longest path does not pass through the root', 'Single node tree (diameter is 0 edges)', 'Two node tree (diameter 1)'],
    commonMistakes: ['Assuming the diameter must pass through the tree root; a deep subtree can contain the diameter entirely'],
    interviewExplanation:
      'Compute subtree heights in a single bottom-up post-order pass. At each node, evaluate whether leftHeight + rightHeight exceeds the global diameter seen so far, ensuring O(n) runtime.',
  },
];
