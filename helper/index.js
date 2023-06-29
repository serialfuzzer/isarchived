const fs = require("fs");
var path = require("path");
var Helper = function () {}

Helper.prototype = {
    sleep: async function(seconds){
        return new Promise(resolve => setTimeout(resolve, 1000*seconds))
    },
    combineTargets: function (...args) {
        var targetsArray = [];
        args.map( function (arg) {
            if(Array.isArray(arg)){
                arg.map(target => {
                    targetsArray.push(target);
                })
            }else{
                if(arg!= ""){
                    targetsArray.push(arg);
                }
            }
        })
        return targetsArray;
    },
    getTargetsFromFile: function(filePath){
        
        var targets = [];
        if(filePath != ""){
            const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
            data.split("\n").map(target=>{
                targets.push(target.trim());
            })
        }
        return targets;
    }
}

var HelperInstance = new Helper();

module.exports = HelperInstance;