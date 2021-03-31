export function dfs(grid, startNode, finishNode) {
    console.log(startNode)
    const visitedNodes = [];
    const stack=[];
    const closestNode=startNode;
    if (closestNode === finishNode) {
        console.log(visitedNodes);
        return visitedNodes;
    }
    const visitedNodesInOrder=dfsFunction(grid,closestNode,finishNode,visitedNodes,stack)
    return visitedNodesInOrder;
}
function dfsFunction(grid,closestNode,finishNode,visitedNodes,stack){
    stack.push(closestNode)
    console.log(stack)
    closestNode.isVisited=true;
    var node;
    var flag=false;
    while(stack.length){
         node=stack.pop()
         node.isVisited=true;
         console.log(node)
         if (node.isWall) continue;
         if (node === finishNode) {
            console.log(visitedNodes);
            flag=true;
            return visitedNodes;
          }
          const unvisitedNeighbors=getUnvisitedNeighbors(node,grid)
          for (const neighbor of unvisitedNeighbors) {
           stack.push(neighbor)
            neighbor.isConsidered=true;
            neighbor.previousNode = node;
          }
          visitedNodes.push(node);
    }
    if(!flag) alert("Destination can not be reached")
    return visitedNodes;
}

  function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
 
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
 
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited);
// return neighbors;
}