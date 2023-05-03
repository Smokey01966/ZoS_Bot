module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit Guild Message Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editguildmessage|(Day or Header)|(Message)`)
    .addField("Day or Header", `The day of the guild mission you wish to edit or Header if you wish to edit the header \n if a day must match Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, or Sunday`)
    .addField("Message", `The message you wish to override the current message with must be 900 characters or less`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editguildmessagehelp"//Change to name of command
}