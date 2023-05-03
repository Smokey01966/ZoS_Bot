module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Delete Member Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}deletealtaccount|(Gw2Account)|(Gw2Account)`)
    .addField("Gw2Account", "The Gw2Account of the alternate account you wish to delete both entries must match exactly")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "deletealtaccounthelp"//Change to name of command
}