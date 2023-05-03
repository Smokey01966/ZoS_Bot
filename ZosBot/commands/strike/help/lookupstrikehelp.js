module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Look Up Stike Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}lookupstrike|(Field)|(Data)`)
    .addField("Field", `The field you wish to search under can be \n    ${strikeFieldsConfig.data.fields.join("\n    ")}\n if left blank wil default to strike number`)
    .addField("Search", "The information your are seaching for")
    .addField("Note on strike notes", "The strike notes will only be displayed if searching under strikenumber")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "lookupstrikehelp"//Change to name of command
}