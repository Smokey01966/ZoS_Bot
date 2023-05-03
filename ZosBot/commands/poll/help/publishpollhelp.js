module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Publish Poll Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}publishpoll|(Poll Number)`)
    .addField("IMPORTANT", "Once a poll is opened for voting the poll properties and options can not be changed")
    .addField("Note on Permissions", `Only the poll owner or a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} can edit a poll`)
    .addField("Poll Number", "The number of the poll you wish to open to voting")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "publishpollhelp"//Change to name of command
}