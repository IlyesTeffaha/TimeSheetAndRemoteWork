const express =require('express') ;
const chatbot = require('../chatbot/chatbot');
var router = require('express').Router();


    router.get('/', (req, res) => {
        res.send({'hello': 'Johnny'})
    });

    router.post('/api/df_text_query', async (req, res) => {
        let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    router.post('/api/df_event_query', async (req, res) => {
        let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
        res.send(responses[0].queryResult);
    });
    module.exports = router;