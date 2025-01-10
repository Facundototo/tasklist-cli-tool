
const fs = require('fs');
const path = require('path');

//path to local JSON files
const LOCAL_DIR = path.join(__dirname, '../../local');

// create local folder if not existing
if (!fs.existsSync(LOCAL_DIR)) {
    fs.mkdirSync(LOCAL_DIR, { recursive: true }); 
}

const FILE_PATH_DATA = path.join(LOCAL_DIR, 'tasks.json');
const FILE_PATH_CACHE = path.join(LOCAL_DIR, 'cache.json');

//reads the file if exists or create a new one
function loadData(){       

    let parsed_data = [{}];

    if(fs.existsSync(FILE_PATH_DATA)){
        try {
            parsed_data = JSON.parse(fs.readFileSync(FILE_PATH_DATA,'utf8'));
        } catch (error) {
            console.error('Error loading the file: ',error);
        }
    }else return {nextId:1,tasks:[]};

    //if there are no tasks, i reset the nextId variable
    return (!parsed_data.tasks.length) ? {nextId:1,tasks:[]} : parsed_data;     

}

//saves the tasks back to the local JSON file
function saveData(data){       
    try {
        fs.writeFileSync(FILE_PATH_DATA,JSON.stringify(data),'utf8');
    } catch (error) {
        console.error('Error saving the file: ',error);
    }
}

//cache deleted tasks
function loadIntoCache(task_deleted) {        

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

//clears cache
function clearCache(){      

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

module.exports = {loadData,saveData,loadIntoCache,clearCache};