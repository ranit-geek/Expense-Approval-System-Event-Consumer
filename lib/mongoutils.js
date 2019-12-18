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
    status: String
})

async function MongoConnection(url)
{
    mongoose.connect(url,{ useNewUrlParser: true })
        .then(()=>console.log("connection succesfull"))
        .catch((err)=>console.log(`Error while connecting to mongo ${err}`))
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


// async function QueryFromMongo(limit)
// {
//         const Course = mongoose.model("Course",schema)
//         const result = await Course.find().limit(limit)
//         console.log(result)
//         return result

// }

// async function Update(query,payload)
// {
//     const Course = mongoose.model("Course",schema)
//     const result= await Course.findOneAndUpdate(query,payload,{new : true})
//     return result
    
// }

//   async function Delete(id)
// {
//     const Course = mongoose.model("Course",schema)
//     const result = await Course.findOneAndRemove({_id : id},(err,data)=>{
//         if(!err)
//         {
//             console.log("deleted")
//         }
//     })
//     console.log(id)
   
// }

exports.connect=MongoConnection
exports.insert=InsertIntoDb
// exports.get=QueryFromMongo
exports.queryCustom=queryCustom
// exports.update=Update
// exports.delete=Delete