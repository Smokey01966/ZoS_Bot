module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    let memberHelpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Commands")
    .setColor("#3d7d05")
    .addField("Command Format", `All commands are preceded by ${botConfig.prefix}. | is used to break up elements of a command. Commands can be entered in a text chanel or DMed to the bot, but their results will always be DMed to you`)
    .addField("Member Module", `Type ${botConfig.prefix}memberhelp for more information`)
    .addField("Strike Module", `Type ${botConfig.prefix}strikehelp for more information`)
    .addField("Calendar Module", `Type ${botConfig.prefix}calendarhelp for more information`)
    .addField("Application Module", `Type ${botConfig.prefix}applicationhelp for more information`)
    .addField("Poll Module", `Type ${botConfig.prefix}pollhelp for more information`);
    if(common.methods.officerCheck(message) === "yes"){
        memberHelpEmbed.addField(`Moderation Module`, `Type ${botConfig.prefix}moderationhelp for more information`)
        memberHelpEmbed.addField(`Lottery Module`, `Type ${botConfig.prefix}lotteryhelp for more information`)
    }
    sender.send(memberHelpEmbed);
    return;
}
module.exports.help = {
    name: "help"//Change to name of command
}