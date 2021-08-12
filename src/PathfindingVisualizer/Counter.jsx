import React, {Component} from 'react';
import './PathfindingVisualizer.css';
export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalVisitedNodes:"",
            pathLength:""
        }
        this.props.registerCounter(this);
    }
    setTotalVisitedNodes(noOfNodes){
   this.setState({totalVisitedNodes: noOfNodes});
    }
    setPathLength(pathlen){
        this.setState({pathLength:pathlen });   
    }
        render(){
            return(
                <div>
                <span className="info"><b>Total Visited Nodes: {this.state.totalVisitedNodes}</b></span>
                <span className="info"><b>Path Length: {this.state.pathLength}</b></span>
                </div>
            );
}
    }
