module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Look Up Member Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}lookupmember|(Field)|(Search)`)
    .addField("Field", `The field you wish to search under can be \n    ${memberFieldsConfig.data.fields.join("\n    ")}\n if left blank will default to Gw2 Account`)
    .addField("Search", "The information your are searching for")
    .addField("Formatting", `For help on what formats should be used for the fields type ${botConfig.prefix}formattinghelp`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "lookupmemberhelp"//Change to name of command
}