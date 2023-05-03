module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit Application Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editmyapplication|(Gw2 Account)|(Field)|(Data)`)
    .addField("Gw2 Account", `The Gw2 Account of the application you wish to edit`)
    .addField("Field", `The field you wish to edit can be \n    Gw2 Account\n    Age\n    Play Time\n    Play Style\n    Past Guilds\n    Reason for Applying\n    About Me`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editapplicationhelp"//Change to name of command
}