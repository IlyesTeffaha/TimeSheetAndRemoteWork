'use strict'
const dialogflow = require('dialogflow');
// const structjson = require('./structjson.js');
const {struct} = require('pb-util');
const config = require('../config/keys');
const mongoose = require('mongoose');

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);


const Registration = mongoose.model('registration');

module.exports = {
    textQuery: async function(text,parameters={}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses =  self.handleAction(responses);
        return responses;

    },
    eventQuery: async function(event,parameters={}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters:struct.encode(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },
    handleAction: function(responses){
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'save':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields);


                }
                break;
        }

        // // console.log(queryResult.action);
        // // console.log(queryResult.allRequiredParamsPresent);
        // // console.log(queryResult.fulfillmentMessages);
        // // console.log(queryResult.parameters.fields);
        return responses;
    },
    saveRegistration: async function(fields){
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.adress.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        });
        try{
            let reg = await registration.save();
            console.log(reg);
        } catch (err){
            console.log(err);
        }
    }


}

