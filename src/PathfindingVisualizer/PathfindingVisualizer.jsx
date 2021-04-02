import React, {Component} from 'react';
import Node from './Node/Node';
import { MDBContainer, MDBRow, MDBCol , MDBBtn,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem  } from "mdbreact";
import Select from 'react-select';
import './PathfindingVisualizer.css';
import {dijkstra} from '../algorithms/dijkstra';
import {dfs} from '../algorithms/dfs';
import {bfs} from '../algorithms/bfs';
import {AStar} from '../algorithms/AStar'
import {getNodesInShortestPathOrder} from '../algorithms/getNodesInShortestPathOrder'
import Counter from './Counter'
import Complexity from './Complexity'
import {spiral} from '../algorithms/try'
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
      isVisualize:false,
      };
      this.counter=null;
    }
    componentDidMount() {
      const nodes = this.getInitialGrid();
      this.setState({nodes});
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
        document.getElementById("mazeDropDown").style.pointerEvents="auto";
        document.getElementById("mazeDropDown").style.cursor="pointer";
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
        document.getElementById("mazeDropDown").style.pointerEvents="none";
        document.getElementById("mazeDropDown").style.cursor="default";
      }

      handleMouseDown(row, col) {
        if(this.state.isVisualize) return;
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
        var selectedAlgo=this.state.algo;
        if (this.state.startNodePressed){
        this.setState({ mouseIsPressed: false, startNodePressed: false });
        this.handleClear();
         this.visualize();
        }
      else if (this.state.finishNodePressed){
        this.setState({ mouseIsPressed: false, finishNodePressed: false });
        this.handleClear();
        this.visualize();
      }
        else
        this.setState({mouseIsPressed: false});
      }
       
    clearPath=()=>{
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          var node=this.state.nodes[row][col];
          node.isVisited=false;
          node.distance=Infinity;
          node.previousNode=null;
          node.isConsidered=false;
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
      this.counter.setTotalVisitedNodes("");
       this.counter.setPathLength("");
    }
    handleClear=()=>{
     for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          var node=this.state.nodes[row][col];
          node.isVisited=false;
          node.distance=Infinity;
          node.previousNode=null;
          node.isConsidered=false;
          if(row === this.state.startNode.row && col === this.state.startNode.col){
            document.getElementById(`node-${row}-${col}`).className ="node node-start";
          }
          else if(row === this.state.finishNode.row && col === this.state.finishNode.col){
            document.getElementById(`node-${row}-${col}`).className ="node node-finish" ;
          }
         // else if(node.isWall){
           // document.getElementById(`node-${row}-${col}`).className ="node node-wall" ;
          //}
          else{
          document.getElementById(`node-${row}-${col}`).className ="node clearNode";
          }
        }
      }
     // document.getElementById("algoDropDown").value="Select Algo";
      document.getElementById("speedDropDown").value="Speed";
      const nodes = this.getInitialGrid();
       this.counter.setTotalVisitedNodes("");
       this.counter.setPathLength("");
      this.setState({
        nodes: nodes,
        speed:10,
      })
    }
    RandomObstructionMaze=()=>{
      this.handleClear();
      this.disableButtons();
      console.log("random called")
      var i=0;
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 20; col++) { 
          i=i+1;
          setTimeout(() => {
          var colRandom=Math.floor(Math.random()*50)
          console.log(colRandom)
          var node=this.state.nodes[row][colRandom]
          if(!node.isStart && !node.isFinish){
          node.isWall=true;
          document.getElementById(`node-${row}-${colRandom}`).className ="node node-wall";}
          },22*i);
       

        }
      }
      setTimeout(()=>{
        this.enableButtons()},10000);
        //this.setState({isVisualize:false})
      
    }
  
   alternateMaze=()=>{
    this.handleClear();
    this.disableButtons();
    console.log("alternate called")
    var i=0
    for (let row = 0; row < 20; row=row+2) {
      for (let col = 0; col < 50; col=col+2) { 
        i=i+1;
        setTimeout(() => {
          var node=this.state.nodes[row][col]
          if(!node.isStart && !node.isFinish){
          node.isWall=true;
          document.getElementById(`node-${row}-${col}`).className ="node node-wall";}
          },22*i);
      }
    }
   
    setTimeout(()=>{
      this.enableButtons()},10000);
   }

   randomConnection=()=>{
     this.alternateMaze();
    this.RandomObstructionMaze();
   }
   spiralMaze=()=>{
    this.handleClear();
    this.disableButtons();
    const {nodes,startNode,finishNode} = this.state;
    const spiralNodes=spiral(nodes,startNode,finishNode)
    this.setState({
      nodes:this.state.nodes
    })
    console.log(spiralNodes)
    var j=0;
    for(let i=0;i<spiralNodes.length;i++){
      j=j+1;
      setTimeout(() => {
        const node=spiralNodes[i];
        
        if(!node.isStart && !node.isFinish){
        node.isWall=true;
        console.log(node)
        document.getElementById(`node-${node.row}-${node.col}`).className ="node node-wall";}
        },22*j);
    }
    setTimeout(()=>{
      this.enableButtons()
    },5000);
  }
   /* onMazeChange=(event)=>{
      console.log(event.target.value)
      //this.setState({
      //  maze: event.target.value,
      //})
      var selectedMaze=event.target.value
      console.log(selectedMaze)
      if(selectedMaze=="Maze:") return;
      if(selectedMaze==="Random Obstruction") this.RandomObstructionMaze();
      else if(selectedMaze==="Random Connection") this.randomConnection();
      else if(selectedMaze==="Alternate Maze") this.alternateMaze();
      else   this.spiralMaze();
      //if(selectedMaze==="Random Obstruction"){
       // this.RandomObstructionMaze();
       // this.alternateMaze();
       //this.randomConnection();
      //}
    }*/
   
    onAlgoChange=(event)=>{
      this.setState({
        algo: event.target.value
    })
    console.log(this.state.algo)
      event.preventDefault()
  }
  onSpeedChange=(event)=>{
    this.setState({
      speed: event.target.value
  })
    event.preventDefault()
}
      visualize=()=>{
        this.clearPath();
        var selectedAlgo=this.state.algo
        if(selectedAlgo==="Algorithm:"){
         alert("Select an Algo First")
          return;
        }
        this.setState({isVisualize:true})
         // alert("BFS Function called")
          const {nodes,startNode,finishNode} = this.state;
           const startnode = nodes[startNode.row][startNode.col];
           const finishnode = nodes[finishNode.row][finishNode.col];
           const start_row=startNode.row;
           const start_col=startNode.col;
           if (start_row > 0 && start_row < nodes.length - 1 && start_col > 0 && start_col < nodes[0].length - 1) {
             if(nodes[start_row-1][start_col].isWall && nodes[start_row+1][start_col].isWall && nodes[start_row][start_col+1].isWall && nodes[start_row][start_col-1].isWall){
               alert("Destination can not reached..");
               return;
             }
           }
           this.disableButtons();
           var visitedNodesInOrder;
           if(selectedAlgo==="BFS"){
           visitedNodesInOrder=bfs(nodes, startnode, finishnode);
          }
          else if(selectedAlgo==="DFS"){
            visitedNodesInOrder=dfs(nodes, startnode, finishnode);
          }
          else if(selectedAlgo==="Dijkstra Algo"){
            visitedNodesInOrder=dijkstra(nodes, startnode, finishnode);
           }
           else if(selectedAlgo==="A*"){
            visitedNodesInOrder=AStar(nodes, startnode, finishnode);
            console.log(visitedNodesInOrder)
            }
          const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishnode);
           this.animate(visitedNodesInOrder, nodesInShortestPathOrder)
      }
      
      
      animate(visitedNodesInOrder, nodesInShortestPathOrder) {
        var s=this.state.speed;
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder,visitedNodesInOrder);
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
          
         // this.setState({totalVisitedNodes:i});
         this.counter.setTotalVisitedNodes(i);
        // console.log(`node-${node.row}-${node.col}`)
          }, s * i);
        }
        
      }
 
      registerCounter=(c)=>
      {
        this.counter=c;
      }
      
      animateShortestPath(nodesInShortestPathOrder,visitedNodesInOrder) {
        
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
            this.counter.setPathLength(i);
           // console.log(`node-${node.row}-${node.col}`)
          }, 30 * i);
          
        }
        this.setState({isVisualize:false})
        setTimeout(()=>{
        this.enableButtons()},4000);
        //this.setState({isVisualize:false})
        //const {nodes,startNode,finishNode} = this.state;
        //const finishnode = nodes[finishNode.row][finishNode.col];
        //const len=visitedNodesInOrder.length
        //   if(visitedNodesInOrder[len-1]!==finishnode) alert("Destination can not be reached")
      }

      render(){
          const {nodes,mouseIsPressed,}=this.state;
          console.log("render chala");
          return(
           
         <MDBContainer fluid>  
           <header id="header">
             <div id="heading">
           <h2 id="title">VisuAlgo</h2>
           <h2>Algo Selected: {this.state.algo}</h2>
           </div>
           </header>
           <div id="section">
           <MDBDropdown >
      <MDBDropdownToggle caret color="default" id="mazeDropDown" >
      Maze:
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <MDBDropdownItem onClick={this.RandomObstructionMaze} value="Random Obstruction">Random Obstruction</MDBDropdownItem>
        <MDBDropdownItem onClick={this.randomConnection} value="Random Connection">Random Connection</MDBDropdownItem>
        <MDBDropdownItem onClick={this.alternateMaze} value="Alternate Maze">Alternate Maze</MDBDropdownItem>
        <MDBDropdownItem onClick={this.spiralMaze} value="Spiral Maze">Spiral Maze</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>

             <MDBDropdown >
      <MDBDropdownToggle caret color="default" id="algoDropDown" >
      Algorithm: {this.state.algo}
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <MDBDropdownItem onClick={this.onAlgoChange} value="DFS">DFS</MDBDropdownItem>
        <MDBDropdownItem onClick={this.onAlgoChange} value="BFS">BFS</MDBDropdownItem>
        <MDBDropdownItem onClick={this.onAlgoChange} value="Dijkstra Algo">Dijkstra Algo</MDBDropdownItem>
        <MDBDropdownItem onClick={this.onAlgoChange} value="A*">A*</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>  
           <MDBDropdown >
      <MDBDropdownToggle caret color="default" id="speedDropDown" >
      Speed:{this.state.speed}
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <MDBDropdownItem onClick={this.onSpeedChange} value="5">2px</MDBDropdownItem>
        <MDBDropdownItem onClick={this.onSpeedChange} value="10">1px</MDBDropdownItem>
        <MDBDropdownItem onClick={this.onSpeedChange} value="20">0.5px</MDBDropdownItem>
        <MDBDropdownItem onClick={this.onSpeedChange} value="40">0.25px</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
              <MDBBtn onClick={this.visualize} id="visualizeButton">Visualize</MDBBtn>
              <MDBBtn onClick={this.handleClear} id="clearButton">Clear</MDBBtn>
              <div  id="infoSection">
             <Counter registerCounter={this.registerCounter}/>
             <Complexity algo={this.state.algo}/>
             </div>
             </div>
             
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