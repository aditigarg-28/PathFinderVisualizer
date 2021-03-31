export function bfs(grid, startNode, finishNode) {
    console.log(startNode)
const visitedNodes = [];
    const queue=[];
    const closestNode=startNode;
    if (closestNode === finishNode) {
        console.log(visitedNodes);
        return visitedNodes;
    }
    const visitedNodesInOrder=bfsFunction(grid,closestNode,finishNode,visitedNodes,queue)
    return visitedNodesInOrder;
}
function bfsFunction(grid,closestNode,finishNode,visitedNodes,queue){
    queue.push(closestNode)
    console.log(queue)
    closestNode.isVisited=true;
    var node;
    var flag=false;
    while(queue.length){
         node=queue.shift()
         node.isVisited=true;
         if (node.isWall) continue;
         visitedNodes.push(node);
         console.log(node)
         if (node === finishNode) {
            console.log(visitedNodes);
            flag=true;
            return visitedNodes;
          }
          const unvisitedNeighbors=getUnvisitedNeighbors(node,grid)
          for (const neighbor of unvisitedNeighbors) {
           queue.push(neighbor)
            neighbor.isConsidered=true;
            neighbor.previousNode = node;
          }
       
    }
    if(!flag) alert("Destination can not reached")
    return visitedNodes;
}


  function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
 
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
 
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isConsidered);
// return neighbors;
}
