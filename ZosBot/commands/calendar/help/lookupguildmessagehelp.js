module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Look Up Guild Message Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}lookupguildmessage|(Day of the week)`)
    .addField("Day of the week", `The day of the week you wish to look up the guild message for if left blank defaults to the current day`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "lookupguildmessagehelp"//Change to name of command
}