module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit Myself Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editmyself|(Field)|(Data)`)
    .addField("Field", `The field you wish to edit can be \n    ${memberFieldsConfig.data.editFields.join("\n    ")}`)
    .addField("Formatting", `For help on what formats should be used for the fields type ${botConfig.prefix}formattinghelp`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editmyselfhelp"//Change to name of command
}