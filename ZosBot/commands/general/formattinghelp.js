module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Formatting Help")
    .setColor("#3d7d05")
    .addField("Member Field Formats", memberFieldsConfig.data.formatting.join("\n"))
    ;
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "formattinghelp"//Change to name of command
}