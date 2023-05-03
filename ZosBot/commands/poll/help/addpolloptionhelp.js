module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Poll Option Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addpolloption|(Poll Number)|(Option)`)
    .addField("Note on Permissions", `Only the poll owner or a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} can edit a poll`)
    .addField("Poll Number", "The number of the poll you wish to add the option to")
    .addField("Option", "The option you wish to add to the poll")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addpolloptionhelp"//Change to name of command
}