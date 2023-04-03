---
title: "Data Structure-Graph-Depth First Traversal/Search"
description: "https&#x3A;//gmlwjd9405.github.io/2018/08/14/algorithm-dfs.html"
date: 2022-10-06T23:04:17.305Z
tags: []
---
## 정의
- 하나의 정점으로부터 시작하여 차례대로 모든 정점들을 한 번씩 방문하는 것
- Ex) 특정 도시에서 다른 도시로 갈 수 있는지 없는지, 전자 회로에서 특정 단자와 단자가 서로 연결되어 있는지

## 설명
![](/images/901dd08d-216a-4390-adf6-5fd60d512f4d-image.png)

1 0 노드(시작 노드)를 방문한다.
 - 방문한 노드는 방문했다고 표시한다.

2 0와 인접한 노드들을 차례로 순회한다.
 - 0와 인접한 노드가 없다면 종료한다.

3 0와 이웃한 노드 1를 방문했다면, 0와 인접한 또 다른 노드를 방문하기 전에 1의 이웃 노드들을 전부 방문해야 한다.
 - 1를 시작 정점으로 DFS를 다시 시작하여 1의 이웃 노드들을 방문한다.

4 1의 분기를 전부 완벽하게 탐색했다면 다시 0에 인접한 정점들 중에서 아직 방문이 안 된 정점을 찾는다.
 - 즉, 1의 분기를 전부 완벽하게 탐색한 뒤에야 0의 다른 이웃 노드를 방문할 수 있다는 뜻이다.
 - 아직 방문이 안 된 정점이 없으면 종료한다.
 - 있으면 다시 그 정점을 시작 정점으로 DFS를 시작한다.


## 소스

```java
// Java Depth First Search
// -----------------------
// remember that you are putting the vertexes of your graph into a stack and that is what determines the order they are travelled

import java.util.*;
/*
nth array-create 
nth array-add edges
dfs-source vertex-stack
stack-get starting node-add node to stack
add visited node to stack
*/
public class DepthFirstSearch {

    int V;
    ArrayList<Integer> adj[];

    DepthFirstSearch(int noofvertex) {
        V = noofvertex;
        adj = new ArrayList[noofvertex];
        for (int i = 0; i < noofvertex; i++) {
            adj[i] = new ArrayList<>();
        }
    }

    void edge(int x, int y) {
        adj[x].add(y);
    }

    void dfs(int sourcevertex) {
        boolean[] visited = new boolean[V];
        Stack<Integer> s = new Stack<Integer>();
        visited[sourcevertex] = true;
        s.push(sourcevertex);
        int node;
        while (!s.isEmpty()) {
            sourcevertex = s.peek();
            sourcevertex = s.pop();

            for (int i = 0; i < adj[sourcevertex].size(); i++) {
                node = adj[sourcevertex].get(i);
                if (!visited[node]) {
                    s.push(node);
                }
            }
            if (visited[sourcevertex] == false) {
                System.out.print(sourcevertex + " ");
                visited[sourcevertex] = true;
            }
        }
    }

    public static void main(String[] args) {
        DepthFirstSearch g = new DepthFirstSearch(6);

        g.edge(0, 1);
        g.edge(0, 2);
        g.edge(0, 4);
        //g.edge(0, 5);
        g.edge(1, 0);
        g.edge(1, 2);
        g.edge(2, 0);
        g.edge(2, 1);
        g.edge(2, 3);
        g.edge(2, 4);
        g.edge(3, 2);
        g.edge(3, 4);
        g.edge(4, 0);
        g.edge(4, 2);
        g.edge(4, 3);
        //g.edge(4, 5);
        //g.edge(5, 0);
        //g.edge(5, 4);

        g.dfs(0);
    }
}

// 결과
//==========
// 4 3 2 1
```

## 추가 설명
![](/images/a42bd67c-1273-4938-8ffc-8f1affb90af2-image.png)
![](/images/dbd03ad2-2190-4f36-b1de-312fd416db9d-image.png)
![](/images/98d4d19a-9f7b-4747-834d-fc8ed28f10fb-image.png)





## 출처
https://gmlwjd9405.github.io/2018/08/14/algorithm-dfs.html

https://www.tutorialspoint.com/data_structures_algorithms/depth_first_traversal.htm