const express =require('express') ;
const {WebhookClient} = require('dialogflow-fulfillment');
var router = require('express').Router();
const TaskMessage = require('../models/taskMessage.js') ;


    router.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function snoopy(agent) {
            agent.add(`Welcome to my Snoopy fulfillment!`);
        }
        async function completedtasks(agent) {
            // agent.add(`Welcome to  task fulfillment!`);
            agent.add(`Here are your finished tasks:` );
            let tasks = await TaskMessage.find();
            tasks.forEach(function(task,index,err){
                
                if (task !== null && task.completed==true ) {
                    responseText = `   `;
                    // responseText+=`${task.title}`;
                    agent.add( responseText+=`${task.title} due at ${task.dueDate.toDateString()}`);
                }
    
                // agent.add(responseText);
            })
            // agent.add(responseText);
        }
        async function uncompletedtasks(agent) {
            // agent.add(`Welcome to  task fulfillment!`);
            agent.add(`Here are your current tasks:` );
            let tasks = await TaskMessage.find();
            tasks.forEach(function(task,index,err){
                
                if (task !== null && task.completed!==true ) {
                    responseText = `   `;
                    // responseText+=`${task.title}`;
                    agent.add( responseText+=`${task.title}  `);
                }
    
                // agent.add(responseText);
            })
            // agent.add(responseText);
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('snoopy', snoopy);
        intentMap.set('completed tasks', completedtasks);
        intentMap.set('Uncompleted tasks', uncompletedtasks);

        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

    module.exports = router;