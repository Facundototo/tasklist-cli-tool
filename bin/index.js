#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

//mycli <add> <description>
//mycli <update> <id_task>
//mycli <delete> <id_task>
//mycli <mark-in-progress> <id_task>
//mycli <mark-done> <id_task>
//mycli <list> [done,todo,in-progress]

const FILE_PATH = path.join(__dirname, 'tasks.json');;

const args = process.argv.slice(2);     //i extract the first two because they are the paths.

// -- help argument here. --

options();

function options(){

    let tasks = loadTasks();

    switch(args[0]){
        case 'add':
        
            tasks.push({        //push the new task.
                id: tasks.length+1,
                description: args.splice(1).join(' '),      //i extract the first argument, which in this case is 'add' and join the arguments that form the description.
                status: 'todo',
                createdAt: new Date().toLocaleString(),     // "20/12/2012, 03:00:00"
                updatedAt: null
            })

            saveTasks(tasks);       //save the tasks back to the local JSON file.

            console.log(`Task added successfully (ID: ${tasks.length+1})`);

            break;
    }
}

function loadTasks(){
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

function saveTasks(data){
    try {
        fs.writeFileSync(FILE_PATH,JSON.stringify(data),'utf8');
    } catch (error) {
        console.error('Error saving the file: ',error);
    }
}


