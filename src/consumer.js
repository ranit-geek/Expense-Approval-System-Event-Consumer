const request = require('request');
const mongo = require("./lib/mongoutils")
const mongoUrl= "mongodb://localhost:27017/mydb"
const validateReq=require("./lib/validateSchema")
const producerUrl = 'https://cashcog.xcnt.io/stream'

const req = request(producerUrl)
  .on('data', async data => { 
    event = JSON.parse(data)
    const result= validateReq.validate(event)
    if(result.error===null)
    {
        const connection = await mongo.connect(mongoUrl)
        query = {"uuid" : event["uuid"]}
        const findEntry= await mongo.queryCustom(query)           
        if (!findEntry.count > 0)
        {
            console.log(findEntry)
            event["created_at"] = new Date(event["created_at"])
            const result= await mongo.insert(event)
            
            console.log("@@@@@@@@@@@@@@-------ADDED---------@@@@@@@@@@@")
            
        }
        else{
            console.log("Ignoring duplicate events")
            console.log("***************************")
            
            console.log("***************************")
        }
                   
                  
    }
    if(result.error!=null)
    {
        Console.log("Incoming event schema is not proper ")
    }
    });
