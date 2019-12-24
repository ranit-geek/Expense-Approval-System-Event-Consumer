const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    uuid : String,
    description : String,
    created_at : String,
    amount: Number,
    currency: String,
    employee: {
        uuid: String,
        first_name: String,
        last_name: String
    },
    approvalStatus: {
        type: String,
        enum : ['Pending','Approved','Declined'],
        default: 'Pending'
    }
})

async function MongoConnection(url)
{
    if(mongoose.connection.readyState!= 1)
    {
        console.log("********* Creating new connection *********")
        mongoose.connect(url,{ useNewUrlParser: true })
            .then(()=>console.log("after state" + mongoose.connection.readyState))
            .catch((err)=>console.log(`Error while connecting to mongo ${err}`))
    }
    else{
        console.log("ignoring create connection as connection is already alive")
    }
}

async function InsertIntoDb(req){
    const Expense = mongoose.model("Expense",schema)
    const expense = new Expense(req)
    const result = await expense.save()
    console.log(result)
    return result
}


async function queryCustom(payload)
{
    const Expense = mongoose.model("Expense",schema)
    const result= await Expense.find(payload)
    return result
    
}


exports.connect=MongoConnection
exports.insert=InsertIntoDb
exports.queryCustom=queryCustom
