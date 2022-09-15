import React from "react";

function TaskList(props){
  const id=props.id;
  return (<div>
    
      <input type="checkbox" checked={props.completed} class="form-check-input" onChange={()=>{props.onClick(id)}}/>
      <span class="content">{props.content}</span>
  
  </div>);
}

export default TaskList;