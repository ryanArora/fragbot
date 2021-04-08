# Fragbot

Run your own fragrunning bot!

## Setup

1. Download and install [NodeJS](https://nodejs.org)
2. Download this repository (you can do this with git or just download and unzip it through github)
3. Go to any command line, and navigate into the repository's folder
4. Run `npm install` to install the dependencies required to run the code
5. Edit the file called `.env` with any text editor, and fill in the required fields. You don't have to specify the webhoook information if you don't want to.
6. Edit the file called `whitelist.json` with any text editor, and you can add the people permitted to use it in there. If you don't want a whitelist, just make it an empty array by just putting `[]`
7. Run `npm start` while in the folder to start the bot
8. Run Ctrl+C while in the terminal to stop the program

## Running In Background

These steps are optional, but they let you run the code in the background of your computer so you don't have to have the terminal always open

1. Run `npm install -g pm2`
2. To start the program for the first time, run `pm2 start index.js --name fragbot`
3. To stop the program, run `pm2 stop fragbot`
4. To start the program, run `pm2 start fragbot`
5. Note that you'll have to start it again if your computer restarts

## Notice

You might not want to run this on your main account, since there is a small risk that you could get your account banned. If you use a small whitelist you shouldn't be too worried about an alt getting banned.

If you need any help setting this up, message me on Discord to let me know! (ryan.#6339)
