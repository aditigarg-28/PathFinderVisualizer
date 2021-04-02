export function AStar(grid, startNode, finishNode) {
    const closestNode=startNode;
    for(var x = 0; x < 20; x++) {
        for(var y =0 ; y < 50; y++) {
          grid[x][y].f ="" ;
          grid[x][y].g = "";
          grid[x][y].h = "";
          grid[x][y].debug = "";
          grid[x][y].parent = null;
        } 
    } 
    const visitedNodesInOrder=AStarFunction(grid,closestNode,startNode,finishNode)
    return visitedNodesInOrder;
}
function AStarFunction(grid,closestNode,startNode,finishNode){
    const visitedNodesInOrder=[]
    const list=[]
    list.push(closestNode)
    while(list.length){
        var lowInd = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].f <= list[lowInd].f) { lowInd = i; }
        }
        var currentNode = list[lowInd];
        list.splice(lowInd, 1)
        if (grid[currentNode.row][currentNode.col]===finishNode) {
            return visitedNodesInOrder;
        }

        if (grid[currentNode.row][currentNode.col]!==startNode) {
            grid[currentNode.row][currentNode.col].isVisited=true;
            visitedNodesInOrder.push(grid[currentNode.row][currentNode.col])
        }
        var neighbors = getUnvisitedNeighbors( currentNode,grid);
        for (let i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if (neighbor.isVisited || neighbor.isWall)
                continue;

                var gScore = currentNode.g + 1;
                var gScoreIsBest = false;
                if (!list.includes(neighbor)) {

                    gScoreIsBest = true;
                    neighbor.g = gScore
                    neighbor.h = heuristic(neighbor.row, neighbor.col, finishNode.row, finishNode.col);
                    list.push(neighbor);
                }
                else if (gScore < neighbor.g) {
                    gScoreIsBest = true;
                }
                if (gScoreIsBest) {
                    neighbor.parent = currentNode;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                }
            }
    }
}
function heuristic(nx, ny, ex, ey) {
    var d1 = Math.abs(ex - nx);
    var d2 = Math.abs(ey - ny);
    return d1 + d2;
}
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }