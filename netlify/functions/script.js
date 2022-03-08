const MongoClient = require('mongodb').MongoClient
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Medicines'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})
.catch( error => console.error(error))



const {schedule} = require('@netlify/functions')

schedule(alertTime, async function checkMeds(){
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