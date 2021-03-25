import React, {Component} from 'react';
import Node from './Node/Node';
import { MDBContainer, MDBRow, MDBCol , MDBBtn } from "mdbreact";
import './PathfindingVisualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
export default class PathfindingVisualizer extends Component {
    constructor() {
      super();
      this.state = {
        nodes:[],
        algo:"Dijkstra Algo",
        speed:10,
        startNode:{row:10,col:15},
        finishNode:{row:10,col:35},
        previousStartNode:{row:10,col:15},
        previousFinishNode:{row:10,col:35},
        mouseIsPressed: false,
        startNodePressed: false,
      finishNodePressed: false,
      totalVisitedNodes:"",
      pathLength:"",
      };
    }
    componentDidMount() {
      const nodes = this.getInitialGrid();
      this.setState({nodes});

       /*const nodes=[];
        for(let row=0;row<24;row++){
            const currentRow=[];
            for(let col=0;col<70;col++){
              const currentNode={
                col,
                row,
                isStart: row === START_NODE_ROW && col === START_NODE_COL,
                isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                distance: Infinity,
                isVisited: false,
                isWall: false,
                previousNode: null,
              };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow)
        }
        this.setState({nodes});
        */
      }
     

      handleMouseDown(row, col) {
        if (row === this.state.startNode.row && col === this.state.startNode.col){
      this.setState({ startNodePressed: true ,
        previousStartNode:{row:row,col:col},
      });
      console.log("start node chala bhaiya")
      }
      else if (row === this.state.finishNode.row && col === this.state.finishNode.col){
        this.setState({ finishNodePressed: true ,
          previousFinishNode:{row:row,col:col},
        });
      console.log("end node chala bhaiya")
        }
        else{
        const newNodes = getNewGridWithWallToggled(this.state.nodes, row, col);
        this.setState({nodes: newNodes, mouseIsPressed: true});
        }
      }
    
      
    handleMouseEnter(row, col) {
    if (this.state.startNodePressed && this.state.finishNode.row!==row && this.state.finishNode.col!==col){
    console.log("start node enter");
    var previousStartNodeRow=this.state.previousStartNode.row;
    var previousStartNodeCol=this.state.previousStartNode.col;
    document.getElementById(`node-${previousStartNodeRow}-${previousStartNodeCol}`).className ="node node-removeImage";
    document.getElementById(`node-${row}-${col}`).className ="node node-start";
    this.setState({
    startNode:{row:row,col:col} ,
    previousStartNode:{row:row,col:col},
    });
    
    console.log(this.state.startNode)
    }
   else if(this.state.finishNodePressed && this.state.startNode.row!==row && this.state.startNode.col!==col){
  console.log("finish node enter");
  var previousFinishNodeRow=this.state.previousFinishNode.row;
    var previousFinishNodeCol=this.state.previousFinishNode.col;
    document.getElementById(`node-${previousFinishNodeRow}-${previousFinishNodeCol}`).className ="node node-removeImage";
  document.getElementById(`node-${row}-${col}`).className ="node node-finish";
  this.setState({
 finishNode:{row:row,col:col} ,
 previousFinishNode:{row:row,col:col},
});
console.log(this.state.finishNode)
}
        else{
        if (!this.state.mouseIsPressed) return;
        const newNode = getNewGridWithWallToggled(this.state.nodes, row, col);
        this.setState({nodes: newNode});
        }
      }
    
      handleMouseUp() {
        if (this.state.startNodePressed){
        this.setState({ mouseIsPressed: false, startNodePressed: false });
        this.handleClear();
        this.visualizeDijkstra();
        }
      else if (this.state.finishNodePressed){
        this.setState({ mouseIsPressed: false, finishNodePressed: false });
        this.handleClear();
        this.visualizeDijkstra();
      }
        else
        this.setState({mouseIsPressed: false});
      }


      handleClick=(event)=>{
        var selectedAlgo=this.state.algo
        if(selectedAlgo===""){
         alert("Select an Algo First")
          return;
        }
        if(selectedAlgo==="BFS"){
          this.visualizeBFS();
        }
        if(selectedAlgo==="DFS"){
          this.visualizeDFS();
        }
        if(selectedAlgo==="Dijkstra Algo"){
         this.visualizeDijkstra();
        }
    }
    clearPath=()=>{
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          var node=this.state.nodes[row][col];
          if(row === this.state.startNode.row && col === this.state.startNode.col){
            document.getElementById(`node-${row}-${col}`).className ="node node-start";
          }
          else if(row === this.state.finishNode.row && col === this.state.finishNode.col){
            document.getElementById(`node-${row}-${col}`).className ="node node-finish" ;
          }
          else if(node.isWall){
            document.getElementById(`node-${row}-${col}`).className ="node node-wall" ;
          }
          else{
          document.getElementById(`node-${row}-${col}`).className ="node clearNode";
          }
        }
      }
    }
    handleClear=()=>{
     for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          var node=this.state.nodes[row][col];
          if(row === this.state.startNode.row && col === this.state.startNode.col){
            document.getElementById(`node-${row}-${col}`).className ="node node-start";
          }
          else if(row === this.state.finishNode.row && col === this.state.finishNode.col){
            document.getElementById(`node-${row}-${col}`).className ="node node-finish" ;
          }
          else if(node.isWall){
            document.getElementById(`node-${row}-${col}`).className ="node node-wall" ;
          }
          else{
          document.getElementById(`node-${row}-${col}`).className ="node clearNode";
          }
        }
      }
     // document.getElementById("algoDropDown").value="Select Algo";
      document.getElementById("speedDropDown").value="Speed";
      const nodes = this.getInitialGrid();
     
      this.setState({
        nodes: nodes,
        speed:10,
        totalVisitedNodes:"",
        pathLength:"",
      })
    }
    onAlgoChange=(event)=>{
      this.setState({
        algo: event.target.value
    })
      event.preventDefault()
  }
  onSpeedChange=(event)=>{
    this.setState({
      speed: event.target.value
  })
    event.preventDefault()
}
      visualizeBFS=()=>{
        alert("BFS Function called")
      }
      visualizeDFS=()=>{
        alert("DFS Function called")
      }
      enableButtons=()=>{
        document.getElementById("visualizeButton").style.pointerEvents="auto";
        document.getElementById("visualizeButton").style.cursor="pointer";
        document.getElementById("clearButton").style.pointerEvents="auto";
        document.getElementById("clearButton").style.cursor="pointer";
        document.getElementById("algoDropDown").style.pointerEvents="auto";
        document.getElementById("algoDropDown").style.cursor="pointer";
        document.getElementById("speedDropDown").style.pointerEvents="auto";
        document.getElementById("speedDropDown").style.cursor="pointer";
      }

      disableButtons=()=>{
        document.getElementById("visualizeButton").style.pointerEvents="none";
        document.getElementById("visualizeButton").style.cursor="default";
        document.getElementById("clearButton").style.pointerEvents="none";
        document.getElementById("clearButton").style.cursor="default";
        document.getElementById("algoDropDown").style.pointerEvents="none";
        document.getElementById("algoDropDown").style.cursor="default";
        document.getElementById("speedDropDown").style.pointerEvents="none";
        document.getElementById("speedDropDown").style.cursor="default";
      }
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        var s=this.state.speed;
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, s * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
          if(node.row === this.state.startNode.row && node.col === this.state.startNode.col){
            document.getElementById(`node-${node.row}-${node.col}`).className ="node node-start";
          }
          else if(node.row === this.state.finishNode.row && node.col === this.state.finishNode.col){
            document.getElementById(`node-${node.row}-${node.col}`).className ="node node-finish" ;
          }
         
        // console.log(`node-${node.row}-${node.col}`)
          }, s * i);
        }
        
      }
 
      
      animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
             'node node-shortest-path';
             if(node.row === this.state.startNode.row && node.col === this.state.startNode.col){
              document.getElementById(`node-${node.row}-${node.col}`).className ="node node-start-visited";
            }
            else if(node.row === this.state.finishNode.row && node.col === this.state.finishNode.col){
              document.getElementById(`node-${node.row}-${node.col}`).className ="node node-finish-visited" ;
            }
           // console.log(`node-${node.row}-${node.col}`)
          }, 50 * i);
          
        }
        setTimeout(()=>{
        this.enableButtons()},2000);
      }


      visualizeDijkstra=()=>{
        this.clearPath();
       this.disableButtons();
        alert("Dijkstra Function called");
        const {nodes,startNode,finishNode} = this.state;
        const startnode = nodes[startNode.row][startNode.col];
        const finishnode = nodes[finishNode.row][finishNode.col];
        const visitedNodesInOrder = dijkstra(nodes, startnode, finishnode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishnode);
        var lengthVisitedNodes=visitedNodesInOrder.length;
        var pathLen=nodesInShortestPathOrder.length;
        this.setState({
          totalVisitedNodes:lengthVisitedNodes,
          pathLength:pathLen,
        });
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }
      render(){
          const {nodes,algo,speed,mouseIsPressed,}=this.state;
          console.log("render chala");
          return(
         <MDBContainer>
           <header id="header">
             <div id="heading">
           <h2 id="title">VisuAlgo</h2>
           <h2>Algo Selected: {this.state.algo}</h2>
           </div>
           </header>
           <select className="dropdown" id="algoDropDown" onChange={this.onAlgoChange}>
           <option>Select Algo</option>
             <option className="dropdown-item" value="DFS">DFS</option>
             <option className="dropdown-item" value="BFS">BFS</option>
             <option className="dropdown-item" value="Dijkstra Algo" selected>Dijkstra Algo</option>
           </select>
           <select className="dropdown" id="speedDropDown" onChange={this.onSpeedChange}>
           <option>Speed</option>
             <option className="dropdown-item" value="5">2px</option>
             <option className="dropdown-item" value="10">1px</option>
             <option className="dropdown-item" value="20">0.5px</option>
             <option className="dropdown-item" value="40">0.25px</option>
           </select>
              <MDBBtn onClick={this.handleClick} className="myButton" id="visualizeButton">Visualize</MDBBtn>
              <MDBBtn onClick={this.handleClear} className="myButton" id="clearButton">Clear</MDBBtn>
              <span className="info">Total Visited Nodes: {this.state.totalVisitedNodes}</span>
              <span className="info">Path Length: {this.state.pathLength}</span>
             
              <div className="grid">
                  {nodes.map((row,rowIdx)=>{       
                      return(
                        <MDBRow>  
                          <MDBCol >
                          <div key={rowIdx} style={{display:"flex"}}>
                          {row.map((node,nodeIdx)=>
                            {
                              const {row, col,isStart,isFinish, isWall,isVisited}=node;
                              return(
                            <Node
                            key={nodeIdx}
                            col={col}
                            row={row}
                            isStart={isStart}
                            isFinish={isFinish}
                            isWall={isWall}
                            isVisited={isVisited}
                            mouseIsPressed={mouseIsPressed}
                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                            onMouseEnter={(row, col) =>
                              this.handleMouseEnter(row, col)
                            }
                            onMouseUp={() => this.handleMouseUp()}
                           >
                            </Node>
                          );
                              })}
                          </div>
                          </MDBCol>
                          </MDBRow>     
                      );                       
                  })}     
              </div>
              </MDBContainer>
          );
      }
 getInitialGrid = () => {
        console.log("getInitialGrid chli");
        const nodes = [];
        for (let row = 0; row < 20; row++) {
          const currentRow = [];
          for (let col = 0; col < 50; col++) {
            currentRow.push(this.createNode(col, row));
          }
          nodes.push(currentRow);
        }
        return nodes;
      };
     createNode = (col, row) => {
        return {
          col,
          row,
          isStart: row === this.state.startNode.row && col === this.state.startNode.col,
          isFinish: row === this.state.finishNode.row && col === this.state.finishNode.col,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
        };
      };
    }
    
    const getNewGridWithWallToggled = (nodes, row, col) => {
      const newGrid = nodes.slice();
      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row][col] = newNode;
      
      return newGrid;
    };