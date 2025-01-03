#!/usr/bin/env node

import { program } from 'commander';

//im gonna use Zod for partial validation.
//moongose to store the tasks.

//Add
program
    .description('add a task')
    .command('add <task_name>')
    .action((task_name) => {
        //Add to db mongoose
        console.log(`Task "${task_name}" added!`);
    })

//Update
program
    .description('update a task')
    .command('update <id> <new_task_name>')
    .action((id,new_task_name) => {
        //Update task in db moongose
    })

//Delete
program
    .description('delete a task')
    .command('delete <id>')
    .action((id) => {
        //Delete task in db moongose
    })

// What left? --> marks and lists.

program.parse(process.argv);