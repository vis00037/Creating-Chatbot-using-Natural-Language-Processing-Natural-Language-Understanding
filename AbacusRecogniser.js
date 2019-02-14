"use strict";

var request = require('request');
const uuid = require('uuid');
var url="http://localhost:8080/abacus-training/sentences";

var AbacusRecognizer = function(token){
	console.log("===AbacusRecognizer===");
    this.app = "";
};

AbacusRecognizer.prototype.recognize = function (context, done){
    var intent = { score: 0.0 };
    try {            
        var sessionId = context.message.address.user.id + context.message.address.channelId;
        if (sessionId.length > 36){
            sessionId = sessionId.slice(0,35);
        }
    } catch(err) {
        var sessionId = uuid();
    }

    if (context.message.text){//some message exist
    	var userText=context.message.text.toLowerCase();
    	console.log("======================userText======================");
		
		request.post({
			url:'http://localhost:8080/abacus-training/sentences', 
			json: true,
			headers: {'content-type' : 'application/json'},
			body:    {'text':userText}
			}, function (error, response, body) {
			  //console.log('error:', error); // Print the error if one occurred
			  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			  //console.log('body:', body); // Print the HTML for the Google homepage.
			if (!error&&response.statusCode == 200) {
				if(body.candidates.length > 0)
				{
					var intentName = body.candidates[0].name;
					var foundEntities = [];
					var i;
					for (i = 0; i < body.candidates[0].graph.nodes.length; i++) { 
						foundEntities[i] = body.candidates[0].graph.nodes[i].name;
						console.log(body.candidates[0].graph.nodes[i].name);
					}
					intent = { score: 1, intent: intentName, entities:foundEntities};
					done(null, intent);
				}
				else
				{
					intent = { score: 1, intent: "unknown_intent", entities:[]};
					done(null, intent);
				}
			}
			else {
		    	console.log("Error ",error)
		    	done(error);
			}
		});
	}
    else{
        intent = {score:1, intent:"None",entities:[]};
        done(null, intent);
    }
}

module.exports = AbacusRecognizer;