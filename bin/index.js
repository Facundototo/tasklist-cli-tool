#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

//task_cli <add> <description>
//task_cli <update> <id_task> <description>
//task_cli <delete> <id_task>
//task_cli <mark-in-progress> <id_task>
//task_cli <mark-done> <id_task>
//task_cli <list> [done,todo,in-progress]

const FILE_PATH = path.join(__dirname, 'tasks.json');;

const args = process.argv.slice(2);     //i extract the first two because they are the paths

// -- help argument --
// -- description min/max length --  

options();

function options(){

    let tasks = loadTasks();

    switch(args[0]){
        case 'add':

            tasks.push({        //push the new task
                id: tasks.length+1,
                description: args[1],     
                status: 'todo',
                createdAt: new Date().toLocaleString(),     // "20/12/2012, 03:00:00"
                updatedAt: null
            })

            saveTasks(tasks);       

            console.log(`Task added successfully (ID: ${tasks.length})`);

            break;

        case 'update':

            let id_task = args[1];
            if(isNaN(parseInt(id_task))){       //checks if the id_task is an integer number
                console.error('syntax error: id must be an integer number');
                break;
            } 

            let update_task_id = tasks.findIndex(task => task.id === Number(id_task));
            if(update_task_id === -1){      //checks if the id_task exists in the tasks
                console.error('error: id not found');
                break;
            } 

            let new_description = args[2]; 

            if(new_description === "") {        //checks if the new description is empty
                console.error('error: description cannot be empty')
                break;
            }
            
            tasks[update_task_id] = {
                ...tasks[update_task_id],
                description:new_description,
                updatedAt: new Date().toLocaleString()      
            }
            
            saveTasks(tasks);  

            console.log(`Task updated successfully (ID: ${id_task}, description: ${new_description})`);

            break;
    }
}

function loadTasks(){       //reads the file if exists or create a new one
    if(fs.existsSync(FILE_PATH)){
        try {
            const data = fs.readFileSync(FILE_PATH,'utf8')
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading the file: ',error)
        }
    }
    return [];
}

function saveTasks(data){       //saves the tasks back to the local JSON file
    try {
        fs.writeFileSync(FILE_PATH,JSON.stringify(data),'utf8');
    } catch (error) {
        console.error('Error saving the file: ',error);
    }
}


