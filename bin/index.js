#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

//task_cli <add> <description>
//task_cli <update> <id_task> <description>
//task_cli <delete> <id_task>
//task_cli <mark-in-progress> <id_task>
//task_cli <mark-done> <id_task>
//task_cli <list> [done,todo,in-progress]

const FILE_PATH = path.join(__dirname, 'tasks.json');

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
            if(!task_index_delete) break;



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
    if(fs.existsSync(FILE_PATH)){
        try {
            const data = fs.readFileSync(FILE_PATH,'utf8')
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading the file: ',error)
        }
    }
    return {nextId:1,tasks:[]};
}

function saveData(data){       //saves the tasks back to the local JSON file
    try {
        fs.writeFileSync(FILE_PATH,JSON.stringify(data),'utf8');
    } catch (error) {
        console.error('Error saving the file: ',error);
    }
}


