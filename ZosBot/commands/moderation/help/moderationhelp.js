module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Moderation Commands")
    .setColor("#3d7d05");
    sender.send(helpEmbed)
    if(common.methods.elevatedOfficerCheck(message) === "yes"){
         //restricted officer commands delete this section if none
         eHelpEmbed= new discord.RichEmbed()
         .setTitle(`${ranksConfig.data.elevatedOfficerRanks.join(" ")} Commands`)
         .setColor("#3d7d05")
         .addBlankField()
         .addField(`${botConfig.prefix}clearchannel`, `Clears the chat channel that the command is typed in \n Must include |clearchannel after the command \nOnly clears text less than 14 day old`)
         .addField(`${botConfig.prefix}refreshautoclear`, `Forces the automated channel clearing to run before its scheduled time`)
         .addField(`${botConfig.prefix}refreshamotd`, `Forces the arch message of the day to refresh before its scheduled time`)
         ;
         sender.send(eHelpEmbed)
    }
    if(common.methods.officerCheck(message) === "yes"){
        //officer commands delete this section if none
        oHelpEmbed= new discord.RichEmbed()
        .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
        .setColor("#3d7d05")
        .addBlankField()
        .addField(`${botConfig.prefix}refreshmotd`, `Forces the message of the day to refresh before its scheduled time`)
        .addField(`${botConfig.prefix}refreshomotd`, `Forces the officer message of the day to refresh before its scheduled time`)
        .addField(`${botConfig.prefix}editwelcome`, `Changes the welcome message that users joining the discord server receive\nFormat /editwelcome|(Welcome Message)`)
        .addField(`${botConfig.prefix}welcome`, `Sends you the current welcome message`)

        ;
        sender.send(oHelpEmbed)
    }
}
module.exports.help = {
    name: "moderationhelp"//Change to name of command
}