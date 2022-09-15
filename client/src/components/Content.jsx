import React, {useEffect, useState} from "react";
import TaskList from "./TaskList";
import useEth from "../contexts/EthContext/useEth";
import { useCallback } from "react";


function Content(){
  
  const { state: { contract, accounts } } = useEth();
  const [tasks,setTasks]=useState([]);
  const [task,setTask]=useState("");
  const [loading,setLoading]=useState(false);

  const getTasks=useCallback(async()=>{
    setLoading(true);
    try{
      const tsk=await contract.methods.read().call({ from: accounts[0] });
      for(var i=1;i<=tsk;i++){
        const tsks=await contract.methods.tasks(i).call({from:accounts[0]});
        setTasks(prevValue=>{return [...prevValue,tsks]});
      }
      setLoading(false);
    }catch(e){
        console.log(e);
    }
  
   },[accounts,contract]);

  useEffect(()=>{
     getTasks();
  },[getTasks]);

  const updateChange =  (event) => {
    setTask(event.target.value);
  };

  const onCheckClick=async(id)=>{
    await contract.methods.toggleCompleted(id).send({from:accounts[0]});
    window.location.reload();
  }

   const addTask= async (event)=>{
    setLoading(true);
    event.preventDefault();
    await contract.methods.createTask(task).send({ from: accounts[0] });
    window.location.reload();
   }

    return <div>

  <div class="container h-100">
  <div class="row align-items-center h-100">
  {loading?<p>Loading....</p>:<p></p>}
    <form>
   
    <div class="mb-3">
    <input  class="form-control" type="text" onChange={updateChange} name="task" value={task} placeholder="Add task..." />
    </div>
   
    <div class="mb-3">
              <button  class="btn btn-primary" onClick={addTask}>Submit</button>
              </div>
            </form>

            <ul>
              {tasks.map(task=><TaskList 
              key={task[0]}
              id={task[0]}
              content={task[1]}
                completed={task[2]}
                onClick={onCheckClick}
              />)}
            </ul>
  </div>
  </div>

  </div>
}

export default Content;