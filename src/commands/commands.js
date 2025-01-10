function printTasks(tasks){
    tasks.forEach(task => {
        console.log(`- ${task.id} -> ${task.description} // ${task.status} // created at ${task.createdAt} ${(task.updatedAt)?`and last update was at ${task.updatedAt}`:''} <-`);
    })
}

// reuse function in mark-in-progress and mark-done arguments
function markTask(id_task,new_status,nextId,tasks){     
    const index = validateIdTask(id_task,tasks);
    if(index !== -1){
        tasks[index].status = new_status;
        saveData({nextId,tasks});
        console.log(`Task marked successfully (ID:${id_task} status:${new_status})`);
    }
} 

module.exports = {printTasks,markTask};