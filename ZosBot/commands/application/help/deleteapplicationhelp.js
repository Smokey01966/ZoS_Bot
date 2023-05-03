module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Delete Application Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}deleteapplication|(Discord Username with #numbers)|(Discord Username with #numbers)`)
    .addField("Discord Username with #numbers", "The Discord Username associated with the application you wish to delete both entries must match exactly")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "deleteapplicationhelp"//Change to name of command
}