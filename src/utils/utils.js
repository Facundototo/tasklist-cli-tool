function validateIdTask(id_task,tasks){

    //checks if the id_task is an integer number
    if(isNaN(parseInt(id_task))){       
        console.error('syntax error: id must be an integer number');
        return -1;
    } 

    let task_index = tasks.findIndex(task => task.id === Number(id_task));
    //checks if the id_task exists in the tasks
    if(task_index === -1){      
        console.error('error: id not found');
        return -1;
    } 

    return task_index;
}

module.exports = {validateIdTask};