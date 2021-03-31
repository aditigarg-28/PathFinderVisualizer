import React, {Component} from 'react';
import './PathfindingVisualizer.css';
export default class Complexity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            algo:this.props.algo,
        }
    }
        render(){
           var spaceComplexity="O(V)"
           var timeComplexity="O(V^2)"
           if(this.state.algo==="DFS" || this.state.algo==="BFS") 
           {
           spaceComplexity="O(V+E)"
           timeComplexity="O(V+E)"   
           }
            return(
                <div>
                <span className="info">Time Complexity: {timeComplexity}</span>
                <span className="info">Space Complexity: {spaceComplexity}</span>
                </div>
            );
}
    }