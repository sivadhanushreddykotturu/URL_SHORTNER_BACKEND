const {nanoid}= require("nanoid");
const URL = require("../models/url");

async function generateShortId(req,res){
    const shortID=nanoid(8);
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error:"URL REQUIED"
        })
    }
    await URL.create({
        shortId :shortID,
        redirectURL : body.url,
        visitHistory : [],
    })
    res.status(201).json({
        id:shortID,
    })
}


async function redirectURL(req,res){
    const shortId = req.params.shortId;
    const expiryDate = Date.now()-(7 * 24 * 60 * 60 * 1000)
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
            createdAt:{
                $gt: expiryDate
            }

        },{
            $push:{
                visitHistory:{
                    timestamp:Date.now(),
                }
            }
        },
        {returnDocument:'after'}
    );
    if(entry){
        res.redirect(entry.redirectURL)
    }
    const link = await URL.findOne({shortId});
    if(!link){
        res.status(404).json({error:'Short URL not found'});
    }else{
        res.status(410).json({error:"Short URL is expired"});
    }
}

async function analyticsURL(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId},)
    res.json(
        {
            totalclicks:entry.visitHistory.length,
            analytics:entry.visitHistory,
        }
    )
}

async function introductionToApplication(req,res){
    res.send(
        `<html>
        <head>
        <style>
        body{
        font-family: -apple-system,BlinkMacSystemFont, sans-serif;
        padding:20px;
        max-width:600px;
        margin: 0 auto;
        }
        </style>
        </head>
        <body>
        <h1>URL SHORTNER API<h1>
        <p>Docs for how to use api routes</p>

        <ul>
        <li>POST / -> Create Short URL</li>
        <pre>
    {
    "url":"https://timetablekl.vercel.app"
    }
    </pre>
    <pre>
    {
    "id": "2vCV9OtQ"
    }
    </pre>
        <li>GET /analytics/:shortId -> Get Analytics Of URL</li>
        <pre>
{
    "totalclicks": 1,
    "analytics": [
       {
            "timestamp": 1779789623809,
            "_id": "6a156f370acc13baa0abdb3a"
        }
    ]
}
</pre>
    <li>GET /:shortId -> Redirects To Original URL,If not available or link expired,throws appropirate error</li>
        </ul>
        </body>
        </html>
        `
    )
}

module.exports = {
    generateShortId, 
redirectURL,
analyticsURL,
introductionToApplication,
};