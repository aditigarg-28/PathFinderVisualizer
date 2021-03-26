import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {
    constructor(props){
        super(props);
        this.state={};
       // console.log("const. chala");
    }
    render(){
        const {
            col,
            isWall,
            isFinish,
            isStart,
            row,
            onMouseDown,
           onMouseEnter,
           onMouseUp,
          } = this.props;
        const extraClassName = isFinish
          ? 'node-finish'
          : isStart
          ? 'node-start'
          : isWall
          ? 'node-wall'
          : '';
        return <div 
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    }
}
export const DEFAULT_NODE={
    row:0,
    col:0,
};