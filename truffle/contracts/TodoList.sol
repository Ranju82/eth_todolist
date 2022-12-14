// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList{
    
    uint public taskCount=0;

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    event ToggleCompleted(
        uint id,
        bool completed
    );

    constructor(){
        createTask("Check out ranjutech.com");
    }

    mapping(uint=>Task) public tasks;

     function read() public view returns (uint) {
         return taskCount;
  }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount]=Task(taskCount, _content,false);
        emit TaskCreated(taskCount,_content,false);
    }

    function toggleCompleted(uint _id) public{
        Task memory _task=tasks[_id];
        _task.completed=!_task.completed;
        tasks[_id]=_task;
        emit ToggleCompleted(_id, _task.completed);
    }
}