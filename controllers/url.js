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

module.exports = {
    generateShortId, 
redirectURL,
analyticsURL,
};