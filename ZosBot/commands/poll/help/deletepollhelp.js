module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Delete Poll Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}deletepoll|(Poll Number)|(Poll Number)`)
    .addField("Note on Permissions", `Only the poll owner or a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} can edit a poll`)
    .addField("Poll Number", "The number of the poll you wish to delete must match exactly both times")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "deletepollhelp"//Change to name of command
}