//Setup
discord = require("discord.js");
fs = require("fs")
firebase = require("firebase");
cronJob = require("cron").CronJob
moment = require('moment-timezone');
servername="Zealots of Shiverpeak"
timeZone="America/New_York"
bot = new discord.Client({disableEveryone: true});
autoClearConfig = require("./configs/autoclear.js");
ranksConfig = require("./configs/ranks.js");
memberFieldsConfig = require("./configs/memberFields.js");
strikeFieldsConfig = require("./configs/strikeFields.js");
common = require("./common/common.js");
automation= require("./common/automation.js")
botConfig = require("./configs/botConfig.json");
firebaseConfig = require("./configs/firebaseConfig.json");
bot.commands = new discord.Collection();
firebase.initializeApp(firebaseConfig);
//load member commands
fs.readdir("./commands/member/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any member commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./Commands/member/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load memberhelp commands
fs.readdir("./commands/member/help/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any member help commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./commands/member/help/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});
//load strike commands
fs.readdir("./commands/strike/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any strike commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./Commands/strike/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load strikehelp commands
fs.readdir("./commands/strike/help/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any strike help commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./commands/strike/help/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});
//load calendar commands
fs.readdir("./commands/calendar/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any calendar commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./Commands/calendar/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load calendarhelp commands
fs.readdir("./commands/calendar/help/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any calendar help commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./commands/calendar/help/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});
//load poll commands
fs.readdir("./commands/poll/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any poll commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./Commands/poll/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load pollhelp commands
fs.readdir("./commands/poll/help/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any poll help commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./commands/poll/help/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load application commands
fs.readdir("./commands/application/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any application commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./Commands/application/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load applicationhelp commands
fs.readdir("./commands/application/help/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any application help commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./commands/application/help/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});


//load moderation commands
fs.readdir("./commands/moderation/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any moderation commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./Commands/moderation/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load moderationhelp commands
fs.readdir("./commands/moderation/help/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any moderation help commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./commands/moderation/help/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load moderation commands
fs.readdir("./commands/lottery/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any lottery commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./Commands/lottery/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//load moderationhelp commands
fs.readdir("./commands/lottery/help/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any lottery help commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./commands/lottery/help/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});


//load general commands
fs.readdir("./commands/General/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find any general commands.")
    }
    jsfile.forEach((f, i) =>{
        let props =require(`./Commands/general/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
});

//Bot initialization
bot.login(botConfig.token);
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("/help")
    bot.on('error', console.error)
    if(autoClearConfig.methods.validate()=== 0){bot.user.setActivity("error with config files check console")};
    if(memberFieldsConfig.methods.validate()=== 0){bot.user.setActivity("error with config files check console")};

});

//Command Handler

bot.on("message", async message =>{
    if(message.author.bot) return;

    let prefix = botConfig.prefix;
    let messageArray = message.content.split("|");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let sender = message.author;

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile){commandfile.run(bot, message, args)};
})


//Welcome Message
bot.on("guildMemberAdd", member =>{
    welcomeRef=firebase.database().ref("welcome/message")
    welcomeRef.once("value", function(snapshot){
        welcome=snapshot.val()
        member.send(welcome)
    })
})
//MOTD generation
new cronJob('3 0 * * * ', function() {
    chan="message-of-the-day"
    channel =bot.channels.find("name", chan)
    channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
    setTimeout(function(){automation.methods.displayGuildMessage(chan)},2000)
    setTimeout(function(){automation.methods.displayBirthdays(chan)},2500)
    setTimeout(function(){automation.methods.memberPolls(chan)},3000)
    setTimeout(function(){automation.methods.memberClosedPolls(chan)},3500)
    setTimeout(function(){automation.methods.displayEvents(chan)},4000)
}, null, true, timeZone);

//Officer MOTD generation
new cronJob('1 0 * * * ', function() {
    chan="officer-motd" 
    channel =bot.channels.find("name", chan)
    channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
    setTimeout(function(){automation.methods.refreshMembers()},500)
    setTimeout(function(){automation.methods.closePolls()},1000)
    setTimeout(function(){automation.methods.autoClear()},1500) 
    setTimeout(function(){automation.methods.displayZealotsInWeek(chan)},2000)
    setTimeout(function(){automation.methods.displayStrikesYesterday(chan)},2500)
    setTimeout(function(){automation.methods.displayApplicationsSubmitted(chan)},3000)
    setTimeout(function(){automation.methods.officerPolls(chan)},3500)
    setTimeout(function(){automation.methods.officerClosedPolls(chan)},4000)
}, null, true, timeZone);

//Arch MOTD generation
new cronJob('2 0 * * * ', function() {
    chan="arch-motd" 
    channel =bot.channels.find("name", chan)
    channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
    setTimeout(function(){automation.methods.displayStrikesAppealed(chan)},500)
    setTimeout(function(){automation.methods.elevatedOfficerPolls(chan)},1000)
    setTimeout(function(){automation.methods.elevatedOfficerClosedPolls(chan)},1500)

}, null, true, timeZone);