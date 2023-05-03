module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.elevatedOfficerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}refreshamotd`);return;}//set number
    chan="arch-motd" 
    channel =bot.channels.find("name", chan)
    channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
    setTimeout(function(){automation.methods.displayStrikesAppealed(chan)},500)
    setTimeout(function(){automation.methods.elevatedOfficerPolls(chan)},1000)
    setTimeout(function(){automation.methods.elevatedOfficerClosedPolls(chan)},1500)
}
module.exports.help = {
    name: "refreshamotd"//Change to name of command
}