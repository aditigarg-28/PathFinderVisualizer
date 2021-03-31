export function AStar(grid, startNode, finishNode) {
    const closestNode=startNode;
    const visitedNodesInOrder=AStarFunction(grid,closestNode,finishNode)
    return visitedNodesInOrder;
}
function AStarFunction(grid,closestNode,finishNode){
    const visitedNodesInOrder=[]
    const list=[]
    list.push(closestNode)
    while(list.length){
        const currentNode=list.shift()
        if(currentNode==finishNode) return visitedNodesInOrder;
        

    }
}