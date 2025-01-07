#!/usr/bin/env node

//mycli <add> <description>
//mycli <update> <id_task>
//mycli <delete> <id_task>
//mycli <mark-in-progress> <id_task>
//mycli <mark-done> <id_task>
//mycli <list> [done,todo,in-progress]

const args = process.argv.slice(2);     //i extract the first two because they are the paths.

// -- help argument here. --

if(args.length < 2 && (args[0] !== 'list')) console.log('syntax error, check "help"');
else options();

function options(){
    switch(args[0]){
        case 'add':
            //-- create a task in JSON file with id,description(which is args[1]),status,createdAt,updatedAt --
            break;
    }
}






