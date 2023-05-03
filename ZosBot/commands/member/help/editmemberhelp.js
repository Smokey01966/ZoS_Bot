module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit Member Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editmember|(Gw2Account)|(Field)|(Data)`)
    .addField("Gw2Account", "The Gw2Account of the member you wish to edit")
    .addField("Field", `The field you wish to edit can be \n    ${memberFieldsConfig.data.restrictedEditFields.join("\n    ")}`)
    .addField("Data", "The information you wish to store in that field")
    .addField("Note on Ranks", `Only members with the rank of ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} can edit members with the rank of ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")}`)
    .addField("Formatting", `For help on what formats should be used for the fields type ${botConfig.prefix}formattinghelp`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editmemberhelp"//Change to name of command
}