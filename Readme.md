# Med Logger

## Why I created this app

This project was created for one simple reason: To help my grandmother take her medications on time, so I came up with a full-stack solution to ensure this.

## What this code sample does:
So the backend, does 2 things:
1. Serves medication information to the front end (https://med-logger.herokuapp.com/)
2. Sends notifications to a family telegram channel

A Telegram bot API is used to send notifications to the telegram channel if she forgets to update her medication status to "taken" in the website (hosted through heroku). This process repeats at 5 minute intervals for 1 hour until she takes her medication.

The backend runs this process during her medication times (morning, afternoon or night) using a cron job package in nodejs.

The front-end consists of medication-listing, functionality to add medication, mark as "taken", and remove medications.



## What I learnt when I created this code sample:

I learnt how to use create a Telegram bot, connect it to a nodejs server with an API and send messages to telegram channels with it.

I also learnt how to set up cron jobs using a node cron package to automate tasks during set intervals and times.

I learnt how to deploy apps to heroku and set up continuous deployment from my github repo.
