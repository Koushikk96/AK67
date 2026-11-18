import { DSAProblem } from '@/types/dsa';

export const graphProblems: DSAProblem[] = [
  {
    id: 'number-of-islands',
    number: 65,
    title: 'Number of Islands',
    category: 'Basic Graphs',
    difficulty: 'Medium',
    description:
      'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1',
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3',
      },
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is \'0\' or \'1\'.'],
    keyConcepts: ['Connected Components', 'Grid DFS / BFS', 'In-Place Visited Marking'],
    pattern: 'Grid DFS Connected Components',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n) worst-case recursion stack',
    hints: [
      'Iterate through every cell in the matrix.',
      'When you encounter a land cell \'1\', increment your island count and trigger a DFS/BFS to sink the entire island by mutating connected \'1\'s to \'0\'s.',
      'The DFS expands in 4 directions: up, down, left, right.',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    int numIslands(std::vector<std::vector<char>>& grid) {
        if (grid.empty()) return 0;

        int m = static_cast<int>(grid.size());
        int n = static_cast<int>(grid[0].size());
        int count = 0;

        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c, m, n);
                }
            }
        }

        return count;
    }

private:
    void dfs(std::vector<std::vector<char>>& grid, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') {
            return;
        }

        grid[r][c] = '0'; // Sink cell to mark visited

        dfs(grid, r + 1, c, m, n);
        dfs(grid, r - 1, c, m, n);
        dfs(grid, r, c + 1, m, n);
        dfs(grid, r, c - 1, m, n);
    }
};`,
    edgeCases: ['Grid with all water \'0\'', 'Grid with all land \'1\' (1 island)', '1x1 grid'],
    commonMistakes: ['Diagonal traversal (islands only connect horizontally and vertically)'],
    interviewExplanation:
      'Finding connected components in an implicit graph. Sinking visited land cells in-place (mutating \'1\' to \'0\') avoids allocating an auxiliary visited matrix, keeping space bounded by call stack.',
  },
  {
    id: 'flood-fill',
    number: 66,
    title: 'Flood Fill',
    category: 'Basic Graphs',
    difficulty: 'Easy',
    description:
      'An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image. Perform a flood fill on the image starting from pixel (sr, sc) with color color by replacing all 4-directionally connected pixels of the original color with color.',
    examples: [
      {
        input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2',
        output: '[[2,2,2],[2,2,0],[2,0,1]]',
      },
      { input: 'image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0', output: '[[0,0,0],[0,0,0]]' },
    ],
    constraints: ['m == image.length', 'n == image[i].length', '1 <= m, n <= 50', '0 <= image[i][j], color < 65536', '0 <= sr < m', '0 <= sc < n'],
    keyConcepts: ['DFS / BFS Traversal', 'Infinite Loop Prevention (Old == New Color)', '4-Directional Spread'],
    pattern: 'Grid DFS Traversal',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n) worst-case recursion stack',
    hints: [
      'Record the starting pixel original color: `int originalColor = image[sr][sc]`.',
      'Crucial edge case: if `originalColor == color`, return the image immediately to avoid an infinite recursion loop!',
      'Otherwise, recurse in all 4 cardinal directions and recolor matching pixels.',
    ],
    cppSolution: `#include <vector>

class Solution {
public:
    std::vector<std::vector<int>> floodFill(std::vector<std::vector<int>>& image, int sr, int sc, int color) {
        int originalColor = image[sr][sc];
        if (originalColor != color) {
            dfs(image, sr, sc, originalColor, color);
        }
        return image;
    }

private:
    void dfs(std::vector<std::vector<int>>& image, int r, int c, int origColor, int newColor) {
        if (r < 0 || r >= static_cast<int>(image.size()) ||
            c < 0 || c >= static_cast<int>(image[0].size()) ||
            image[r][c] != origColor) {
            return;
        }

        image[r][c] = newColor;

        dfs(image, r + 1, c, origColor, newColor);
        dfs(image, r - 1, c, origColor, newColor);
        dfs(image, r, c + 1, origColor, newColor);
        dfs(image, r, c - 1, origColor, newColor);
    }
};`,
    edgeCases: ['Target color is already the starting color (must early-exit to avoid infinite recursion)', '1x1 image', 'Disconnected pixels with original color'],
    commonMistakes: ['Not checking originalColor == color, causing infinite recursion stack overflow'],
    interviewExplanation:
      'Standard graph traversal. Emphasize the defensive check: if image[sr][sc] == color, doing nothing is required to prevent re-visiting recolored cells indefinitely.',
  },
  {
    id: 'find-if-path-exists-in-graph',
    number: 67,
    title: 'Find if Path Exists in Graph',
    category: 'Basic Graphs',
    difficulty: 'Easy',
    description:
      'There is a bi-directional graph with n vertices, numbered from 0 to n - 1. Given the edges where each edges[i] = [u, v] denotes a bidirectional edge between vertex u and vertex v, determine if there is a valid path from source to destination.',
    examples: [
      { input: 'n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2', output: 'true' },
      { input: 'n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5', output: 'false' },
    ],
    constraints: ['1 <= n <= 2 * 10^5', '0 <= edges.length <= 2 * 10^5', '0 <= source, destination < n'],
    keyConcepts: ['Adjacency List', 'BFS / DFS / Disjoint Set Union (DSU)', 'Reachability'],
    pattern: 'Graph Traversal / BFS Queue',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    hints: [
      'If source == destination, return true immediately.',
      'Build an adjacency list representation: `vector<vector<int>> adj(n)`.',
      'Run BFS starting from source using a queue and a visited boolean vector. If destination is dequeued, return true. If queue empties, return false.',
    ],
    cppSolution: `#include <vector>
#include <queue>

class Solution {
public:
    bool validPath(int n, const std::vector<std::vector<int>>& edges, int source, int destination) {
        if (source == destination) return true;

        std::vector<std::vector<int>> adj(n);
        for (const auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        std::vector<bool> visited(n, false);
        std::queue<int> q;

        q.push(source);
        visited[source] = true;

        while (!q.empty()) {
            int curr = q.front();
            q.pop();

            if (curr == destination) return true;

            for (int neighbor : adj[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }

        return false;
    }
};`,
    edgeCases: ['source == destination (returns true)', 'No edges in graph', 'Graph with disconnected components'],
    commonMistakes: ['Building an n x n adjacency matrix when n <= 2 * 10^5, causing memory limit exceeded (O(V^2))'],
    interviewExplanation:
      'Construct an adjacency list in O(V + E) time. BFS explores the graph layer by layer with a visited array preventing cycle loops. Alternatively, Disjoint Set Union (DSU) offers near O(1) connectivity checks.',
  },
];
