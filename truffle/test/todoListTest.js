const TodoList = artifacts.require("TodoList");

contract('TodoList', () => {
 
  it('deployed', async() => {
    const todoListInstance = await TodoList.deployed()
    const taskCount=await todoListInstance.taskCount()  
    assert.equal(taskCount,1)
    const address=todoListInstance.address
    assert.notEqual(address,null)

    const result=await todoListInstance.toggleCompleted(1)
    const task=await todoListInstance.tasks(1)
    assert.equal(task.completed,true)
    const event=result.logs[0].args
    assert.equal(event.id.toNumber(),1)
  });
});
