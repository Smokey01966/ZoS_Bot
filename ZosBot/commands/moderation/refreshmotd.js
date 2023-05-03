module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}refreshmotd`);return;}//set number
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
}
module.exports.help = {
    name: "refreshmotd"//Change to name of command
}