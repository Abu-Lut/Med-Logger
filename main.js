// CRUD functionality

// mkdir api-project
// cd api-project
// npm init 
// npm install express --save
// npm install mongodb --save
// npm install ejs --save
// npm install dotenv --save

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

app.use(express.static(__dirname + "/public"));

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Medicines'                

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})
.catch( error => console.error(error))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(request, response)=>{
    db.collection('Medicines').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addRapper', (request, response) => {
    db.collection('Medicines').insertOne({medName: request.body.medName,
    medTiming: (request.body.timing).toLowerCase(), medStatus: "false"})
    .then(result => {
        console.log('Med Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/updateDone', (request, response) => {
    db.collection('Medicines').updateOne({medName: request.body.medName, medTiming: request.body.medTiming,medStatus: request.body.medStatus},{
        $set: {
            medStatus:"true"
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Updated medicine status')
        response.json('status updated')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteMed', (request, response) => {
    db.collection('Medicines').deleteOne({medName: request.body.medName, medTiming: request.body.medTiming})
    .then(result => {
        console.log('Med Deleted')
        response.json('Med Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})



// TELEGRAM BOT CODE 



const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron')

// replace the value below with the Telegram token you receive from @BotFather
const token = '5212873622:AAGNKMGw2heq_EVvV469-eccR6ay_PKOreI';

// Create a bot that doesn't use 'polling' so it can't fetch new updates
const bot = new TelegramBot(token);

const chatId = '-726538887'

// storing timing details

let session = ''

let time = (new Date()).getHours()
console.log(`time is ${time}`)
let today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`

// finding which part of the day it is

if (time>= 0 && time<=8) {
    session = 'morning'
}else if (time> 8 && time<=16) {
    session = 'afternoon'
}else if (time>16 && time<24) {
    session = 'night'
}

// assigning alert time based on session

let alertTime = ''

if (session=='morning'){
    alertTime = '0 */15 8 * * *' 
}else if (session=='afternoon'){
    alertTime = '0 */15 14 * * *' 
}else if (session=='night'){
    alertTime = '0 */15 21,23 * * *' 
}

// messages to be sent 

// function messages(){
//     return bot.sendMessage(chatId, `Munavar Sultana hasn't taken her ${medication} medicine for ${session}`)
// }

// alert scheduler code 

cron.schedule(alertTime, async function checkMeds(){
    const result = await db.collection("Medicines").find({
        medTiming: session,
        medStatus: "false"
    })

    if (result){
        await result.forEach(item => {
            bot.sendMessage(chatId, `Munavar Sultana hasn't taken her ${item.medName} medicine this ${session} on ${today}, please remind her to take her medicines`)
                }
            )
        }
    },{
        scheduled: true,
        timezone: "Asia/Colombo"
      }
)

cron.schedule('0 59 23 * * *', async function run() {
    let filter = {}
    let updateDoc = {
        $set:{
            medStatus: "false"
        }
    }
    const result = await db.collection("Medicines").updateMany(filter, updateDoc);
    console.log(`Updated ${result.modifiedCount} documents to false`);
})