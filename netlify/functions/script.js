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

export const handler = schedule("* * * * *", async function checkMeds(){
    console.log("first try bismillaah")
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
    }
)