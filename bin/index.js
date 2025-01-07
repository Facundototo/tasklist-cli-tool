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
    switch(args[0]){
        case 'add':
            let tasks = loadTasks();

            tasks.push({
                id: tasks.length+1,
                description: args.splice(1).join(' '),
                status: 'todo',
                createdAt: new Date().toLocaleString(),
                updatedAt: null
            })

            saveTasks(tasks);

            break;
    }
}

function loadTasks(){
    if(fs.existsSync(FILE_PATH)){
        const data = fs.readFileSync(FILE_PATH,'utf8')
        return JSON.parse(data);
    }
    return [];
}

function saveTasks(data){
    fs.writeFileSync(FILE_PATH,JSON.stringify(data),'utf8');
}


