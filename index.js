#!/usr/bin/env node
const cli = require("commander");
const fs = require("fs");
const process = require("process");
const helper = require("./helper");
const controller = require("./controller");
const isStdinEmpty = process.stdin.isTTY || false;


var stdinTargets = [];

if(!isStdinEmpty){
    var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
    targets = stdinBuffer.toString().split("\n").filter(e=>e.length>0).map(e=>e.replace(/\r?\n|\r/g, ""));
    stdinTargets = targets;
}



cli
.description("From a list of subdomains find arhived ones")
.option("-f, --file <value>", "File to import targets from", "")
.option("-d, --domain <value>", "Domain to scan", "")
.action(async function(options){
    const fileName = options.file;
    const domain = options.domain;
    var targetsFromFile = [];
    if(fileName != ""){
        targetsFromFile = helper.getTargetsFromFile(fileName);
    }
    var targets = helper.combineTargets(stdinTargets, targetsFromFile, domain);
    if(targets.length == 0){
        cli.help()
    }
    await controller.getArchivedDomains(targets, console.log);
    /*var deadDomains = await controller.getDeadDomains(targets);
    deadDomains.map(function (domain){
        console.log(domain);
    })*/
})


cli.parse(process.argv)
