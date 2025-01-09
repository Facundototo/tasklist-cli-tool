#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

//task_cli <add> <description>
//task_cli <update> <id_task> <description>
//task_cli <delete> <id_task>
//task_cli <mark-in-progress> <id_task>
//task_cli <mark-done> <id_task>
//task_cli <list> [done,todo,in-progress]

const FILE_PATH_DATA = path.join(__dirname, 'tasks.json');
const FILE_PATH_CACHE = path.join(__dirname, 'cache.json');

const args = process.argv.slice(2);     //i extract the first two because they are the paths

// -- help argument --
// -- description min/max length --  

options();

function options(){

    let { nextId,tasks } = loadData();

    switch(args[0]){

        case 'add':

            tasks.push({        //push the new task
                id: nextId++,
                description: args[1],     
                status: 'todo',
                createdAt: new Date().toLocaleString(),     // "20/12/2012, 03:00:00"
                updatedAt: null
            })

            saveData({nextId,tasks});       

            console.log(`Task added successfully (ID: ${tasks.length})`);

            break;

        case 'update':

            const task_index_update = validateIdTask(args[1],tasks);
            if(task_index_update === -1) break;      

            let new_description = args[2]; 
            if(new_description === "" || new_description === undefined) {        //checks if the new description is empty
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

        case 'delete':

            const task_index_delete = validateIdTask(args[1],tasks);
            if(task_index_delete === -1) break;

            const task_deleted = tasks.splice(0,task_index_delete+1)[0];       // delete action
            
            saveData({nextId,tasks});
            console.log(`Task deleted successfully (ID: ${args[1]})`);
            loadIntoCache({...task_deleted , deletedAt: new Date().toLocaleString()});      // i send the task_deleted object to the loadIntoCache() function and add a deletedAt variable to it

            break;

        case 'mark-in-progress':
            markTask(args[1],'in-progress',nextId,tasks);
            break;

        case 'mark-done':
            markTask(args[1],'done',nextId,tasks);
            break;
        
        case 'clear-cache':
            clearCache();
            break;

        default:
            console.log('That argument does not exist, (check help)');
            break;
    }
}

function validateIdTask(id_task,tasks){

    if(isNaN(parseInt(id_task))){       //checks if the id_task is an integer number
        console.error('syntax error: id must be an integer number');
        return -1;
    } 

    let task_index = tasks.findIndex(task => task.id === Number(id_task));
    if(task_index === -1){      //checks if the id_task exists in the tasks
        console.error('error: id not found');
        return -1;
    } 

    return task_index;
}


function loadData(){       //reads the file if exists or create a new one

    let parsed_data = [{}];

    if(fs.existsSync(FILE_PATH_DATA)){
        try {
            parsed_data = JSON.parse(fs.readFileSync(FILE_PATH_DATA,'utf8'));
        } catch (error) {
            console.error('Error loading the file: ',error);
        }
    }else return {nextId:1,tasks:[]};

    return (!parsed_data.tasks.length) ? {nextId:1,tasks:[]} : parsed_data;     //if there are no tasks, i reset the nextId variable

}

function saveData(data){       //saves the tasks back to the local JSON file
    try {
        fs.writeFileSync(FILE_PATH_DATA,JSON.stringify(data),'utf8');
    } catch (error) {
        console.error('Error saving the file: ',error);
    }
}

function markTask(id_task,new_status,nextId,tasks){     // reuse function in mark-in-progress and mark-done arguments
    const index = validateIdTask(id_task,tasks);
    if(index !== -1){
        tasks[index].status = new_status;
        saveData({nextId,tasks});
        console.log(`Task marked successfully (ID:${id_task} status:${new_status})`);
    }
} 

function loadIntoCache(task_deleted) {        //cache deleted tasks

    let cache = [];

    if(fs.existsSync(FILE_PATH_CACHE)){
        try {
            cache = JSON.parse(fs.readFileSync(FILE_PATH_CACHE,'utf8'));
        } catch (error) {
            console.error('Error loading cache: ',error);
        }
    }

    cache.push(task_deleted);

    try {
        fs.writeFileSync(FILE_PATH_CACHE,JSON.stringify(cache),'utf8');
        console.log('task cached');
    } catch (error) {
        console.error('Error saving cache: ',error);
    }
    
}

function clearCache(){      //clears cache

    if(fs.existsSync(FILE_PATH_CACHE)){
        try {
            fs.writeFileSync(FILE_PATH_CACHE,"[]");
            console.log('cache cleared');
        } catch (error) {
            console.error('Error loading cache: ',error);
        }
    }else{
        console.log("you don't have a cache yet");
    }
}


