var requireDir = require('require-dir');

//Read all dir of taks and return as an object
var availableTasks = requireDir('./tasks', { recurse: true });

var tasks = [], taskObject;

Object.keys(availableTasks).forEach(function(key) {
    if(availableTasks[key].index){
        taskObject = availableTasks[key].index;//main loaded module without the filetype suffix (the index.js file)
    
        if (!taskObject.excludeFromSeries) {
          tasks.push(taskObject.task);//task attribute is generated by the requireDir module
        } 
    }
});

module.exports = tasks ;