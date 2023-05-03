module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit Poll Properties Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editpollproperties|(Poll Number)|(Field)|(Data)`)
    .addField("Note on Permissions", `Only the poll owner or a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} can edit a poll`)
    .addField("Poll Number", "The number of the poll you wish to edit the properties of")
    .addField("Field", "The field you wish to edit. Can be\n    Close Date\n    Number of Votes Per Person\n    Question\n    Rank Required to Vote")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editpollpropertieshelp"//Change to name of command
}