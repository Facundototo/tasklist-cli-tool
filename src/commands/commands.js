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

function printHelp(){
    console.log('arguments :');
    console.log('- add <description>  // add a task');
    console.log('- update <id_task> <description>  // update a task');
    console.log('- delete <id_task>  // delete a task');
    console.log('- mark-in-progress <id_task>  // mark status done');
    console.log('- mark-done <id_task>  // mark status in-progress');
    console.log('- list [done,todo,in-progress]  // list tasks');
    console.log('- clear-cache  // clears the cache of deleted tasks');
}

module.exports = {printTasks,markTask,printHelp};