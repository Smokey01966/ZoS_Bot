module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.elevatedOfficerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}clearchannel|clearchannel`);return;}//set number
    verify=args[0]
    if(message.channel.type==="dm"){sender.send("This command can not be done as a whisper and should be done in the channel you wish to clear");return;}
    if(verify!=="clearchannel"){sender.send("The verification must exactly match \"clearchannel\"");return;}
    channel=message.channel
    channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
}
module.exports.help = {
    name: "clearchannel"//Change to name of command
}