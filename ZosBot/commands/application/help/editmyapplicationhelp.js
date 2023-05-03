module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit My Application Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editmyapplication|(Field)|(Data)`)
    .addField("Field", `The field you wish to edit can be \n    Gw2 Account\n    Age\n    Play Time\n    Play Style\n    Past Guilds\n    Reason for Applying\n    About Me`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editmyapplicationhelp"//Change to name of command
}