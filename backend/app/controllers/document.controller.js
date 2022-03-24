const { Router } = require('express');
const routes = new Router();
const checkLogin = require("../middlewares/auth.login");
const Document = require('../models/document.js');
const DocumentHelper = require("../helpers/document.helper");
const User = require('../models/user');

routes.post(`/documents/word-frequency`, checkLogin, async (req, res) => {
    try
    {
        const document = await Document.findOne();
        const result = DocumentHelper.wordFrequency(document, req.body.word);
        res.send("A palavra "+req.body.word+" foi encontrada em "+result+" frase(s) no texto.");
    }
    catch(exception)
    {
        res.status(400).send({error: exception})
    }
});

routes.post(`/documents/word-sentences`, checkLogin, async (req, res) => {
    try
    {
        const document = await Document.findOne();
        const result = DocumentHelper.wordSentences(document, req.body.word);
        res.send("A palavra "+req.body.word+" foi encontrada em "+result.length+" frase(s) no texto.\n"+result);
       
    }
    catch(exception)
    {
        res.status(400).send({error: exception})
    }
});

routes.post(`/documents/top-words`, checkLogin, async (req, res) =>  {
    try
    {
    const document =  await Document.findOne();
    const result = DocumentHelper.topWords(document, req.body.count, req.body.minWordLength);
    res.send(""+result);
    }
    catch(exception)
    {
        res.status(400).send({error: exception})
    }
});

async function findDoc(){
    return await Document.findOne();
}

module.exports = routes;