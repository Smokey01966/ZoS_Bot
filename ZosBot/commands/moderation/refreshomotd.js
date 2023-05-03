module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}refreshomotd`);return;}//set number
    chan="officer-motd" 
    channel =bot.channels.find("name", chan)
    channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
    setTimeout(function(){automation.methods.refreshMembers()},500)
    setTimeout(function(){automation.methods.closePolls()},1000) 
    setTimeout(function(){automation.methods.displayZealotsInWeek(chan)},1500)
    setTimeout(function(){automation.methods.displayStrikesYesterday(chan)},2000)
    setTimeout(function(){automation.methods.displayApplicationsSubmitted(chan)},2500)
    setTimeout(function(){automation.methods.officerPolls(chan)},3000)
    setTimeout(function(){automation.methods.officerClosedPolls(chan)},3500)
}
module.exports.help = {
    name: "refreshomotd"//Change to name of command
}