const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY
    let api_url = process.env.API_URL

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    let analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {}
        }
    };

    let nlu = getNLUInstance();

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send({'error:': err});
        });

    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {

    let analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    };

    let nlu = getNLUInstance();

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults.result, null, 2));
            let score = analysisResults.result.sentiment.document.score
            let label = analysisResults.result.sentiment.document.label
            console.log(score,label)
            return res.send(label);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send({'error:': err});
        });

    // return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {

    let analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {}
        }
    };

    let nlu = getNLUInstance();

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send({'error:': err});
        });

    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {

    let analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    };

    let nlu = getNLUInstance();

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults.result, null, 2));
            let score = analysisResults.result.sentiment.document.score
            let label = analysisResults.result.sentiment.document.label
            console.log(score,label)
            return res.send(label);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send({'error:': err});
        });

    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

