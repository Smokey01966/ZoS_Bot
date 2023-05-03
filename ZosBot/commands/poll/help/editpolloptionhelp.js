module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit Poll Option Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editpolloption|(Poll Number)|(Option Number)|(Option)`)
    .addField("Note on Permissions", `Only the poll owner or a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} can edit a poll`)
    .addField("Poll Number", "The number of the poll you wish to edit the option in")
    .addField("Option Number", "The option number of the option you wish to edit")
    .addField("Option", "The option you want to replace the current option")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editpolloptionhelp"//Change to name of command
}