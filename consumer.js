const request = require('request');
const mongo = require("./lib/mongoutils")
const mongoUrl= "mongodb://localhost:27017/mydb"
const validateReq=require("./lib/validateSchema")
const producerUrl = 'http://localhost:3111'

const req = request(producerUrl)
  .on('data', async data => { 
    event = JSON.parse(data)
    const result= validateReq.validate(event);
    if(result.error===null)
    {
        const connection = await mongo.connect(mongoUrl)
        query = {"uuid" : event["uuid"]}
        console.log(query)
        const findEntry=mongo.queryCustom(query)
                    .then(async (res)=>{
                        if (!res.count > 0)
                        {
                            const result= await mongo.insert(event)
                            console.log("@@@@@@@@@@@@@@-------ADDED---------@@@@@@@@@@2")
                            console.log(result); 
                        }
                        else{
                            console.log("Ignoring duplicate events")
                            console.log("***************************")
                            console.log(res)
                            console.log("***************************")
                        }
                    })
                    .catch(async (err)=>{
                        console.log(err)
                    })
    }
    if(result.error!=null)
    {
        Console.log("Incoming event schema is not proper ")
    }
    });
