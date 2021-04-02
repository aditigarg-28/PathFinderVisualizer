export function spiral(nodes,startNode,finishNode){
const row=finishNode.row;
const col=finishNode.col;
const finishnode = nodes[row][col];
var right=col+12
var left=col-12
var up=row-8
var down=row+8
const spiralNodes=[]
if(!(up > 0)) up=0
if(!(left>0)) left=0
if(!(right<50)) right=49
if(!(down<20)) down=19
const SpiralNodesInOrder=SpiralImplement(nodes,up,left,down,right,spiralNodes,finishnode);
return SpiralNodesInOrder;
}
function SpiralImplement(nodes,up,left,down,right,spiralNodes,finishnode){
    if (up >= down || left >= right) return spiralNodes;
     var node;
     var p;
    for (p = left-1; p <=right; p++){
    node=nodes[up][p]
    if(node!==finishnode) {
        //node.isWall=true;
        spiralNodes.push(node)
    }
}
for (p =up+1 ; p <=down ; p++){
     node=nodes[p][right]
if(node!==finishnode) {
    //node.isWall=true;
spiralNodes.push(node)
}
}
if ((down - 2) !== up)
for (p = right - 1; p >= left; p--){
    node=nodes[down][p]
    if(node!==finishnode){
        //node.isWall=true;
     spiralNodes.push(node)
    }
}
if ((right - 2) !== left)
for (p = down - 1; p > up+1; p--){
    node=nodes[p][left]
    if(node!==finishnode) {
       // node.isWall=true;
    spiralNodes.push(node)
    }
}
//spiralNodes.push(nodes[p+1][left+1])
SpiralImplement(nodes,up+2,left+2,down-2,right-2,spiralNodes,finishnode)
return spiralNodes;
}