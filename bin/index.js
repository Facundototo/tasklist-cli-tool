#!/usr/bin/env node

const { loadData,saveData,loadIntoCache,clearCache } = require('../src/lib/files.js');
const { printTasks,markTask,printHelp } = require('../src/commands/commands.js');
const { validateIdTask } = require('../src/utils/utils.js');

//i extract the first two because they are the paths
const args = process.argv.slice(2);     

let { nextId,tasks } = loadData();

switch(args[0]){

    //use case task_cli <add> <description>
    case 'add':

        //push the new task
        tasks.push({        
            id: nextId++,
            description: args[1],     
            status: 'todo',
            createdAt: new Date().toLocaleString(),     // "20/12/2012, 03:00:00" 
            updatedAt: null
        })

        saveData({nextId,tasks});       

        console.log(`Task added successfully (ID: ${tasks.length})`);

        break;

    //use casetask_cli <update> <id_task> <description>
    case 'update':

        const task_index_update = validateIdTask(args[1],tasks);
        if(task_index_update === -1) break;      

        let new_description = args[2]; 

        //checks if the new description is empty
        if(new_description === "" || new_description === undefined) {        
            console.error('error: description cannot be empty')
            break;
        }
        
        tasks[task_index_update] = {
            ...tasks[task_index_update],
            description:new_description,
            updatedAt: new Date().toLocaleString()      
        }
        
        saveData({nextId,tasks});  

        console.log(`Task updated successfully (ID: ${args[1]}, description: ${new_description})`);

        break;

    //use case task_cli <delete> <id_task>
    case 'delete':

        const task_index_delete = validateIdTask(args[1],tasks);
        if(task_index_delete === -1) break;

        // delete action
        const task_deleted = tasks.splice(0,task_index_delete+1)[0];       
        
        saveData({nextId,tasks});
        console.log(`Task deleted successfully (ID: ${args[1]})`);
        //i send the task_deleted object to the loadIntoCache() function and add a deletedAt variable to it
        loadIntoCache({...task_deleted , deletedAt: new Date().toLocaleString()});     

        break;

    //use case task_cli <mark-in-progress> <id_task>
    case 'mark-in-progress':
        markTask(args[1],'in-progress',nextId,tasks);
        break;

    //use case task_cli <mark-done> <id_task>
    case 'mark-done':
        markTask(args[1],'done',nextId,tasks);
        break;

    //use case task_cli <list> [done,todo,in-progress]
    case 'list':
        if(!args[1]) {      
            printTasks(tasks);
        }else {                                                                                 
            if(args[1] !== 'done' && args[1] !== 'in-progress' && args[1] !== 'todo'){
                console.log(`'${args[1]}' does not exist as a status`);
            }else{
                const tasks_filtered = tasks.filter(task => task.status === args[1]);
                printTasks(tasks_filtered);
            }
        }
        break;

    //use case task_cli <clear-cache>
    case 'clear-cache':
        clearCache();
        break;
        
    case 'help':
        printHelp();
        break;

    default:
        console.log('That argument does not exist, (check help)');
        break;
}