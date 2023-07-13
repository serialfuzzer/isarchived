const axios = require("axios");
const helper = require("../helper")
const Controller = function() {}

var options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:77.0) Gecko/20190101 Firefox/77.0'
    }
}

Controller.prototype = {
    
    getArchivedDomains: async function(urls, callback){
        callback = callback || undefined;
        var template =  `http://archive.org/wayback/available?url=`;
        var archivedDomains = [];
        for(let i=0;i<urls.length;i++) {
            var url = urls[i];
            var requestURI = template + url;
            var response = await axios.get(requestURI);
            if(Object.keys(response.data.archived_snapshots).length > 0){
                archivedDomains.push(url);
                if(callback != undefined){
                    callback(url) // pass the archived URL callback fn in case you don't want to wait for the entire operation to compelte
                }
            }
            
        }
        return archivedDomains;
    }
}


ControllerInstance = new Controller();

module.exports = ControllerInstance;
