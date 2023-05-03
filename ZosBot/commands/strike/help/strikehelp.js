module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Strike Commands")
    .setColor("#3d7d05");
    sender.send(helpEmbed)
    if(common.methods.elevatedOfficerCheck(message) === "yes"){
         //restricted officer commands delete this section if none
         eHelpEmbed= new discord.RichEmbed()
         .setTitle(`${ranksConfig.data.elevatedOfficerRanks.join(" ")} Commands`)
         .setColor("#3d7d05")
         .addBlankField()
         .addField(`${botConfig.prefix}overturnstrike`, `Overturns the strike \nType ${botConfig.prefix}overturnstrikehelp for more information`)
         .addField(`${botConfig.prefix}validatestrike`, `Validates the strike \nType ${botConfig.prefix}validatestrikehelp for more information`)
         ;
         sender.send(eHelpEmbed)
    }
    if(common.methods.officerCheck(message) === "yes"){
        //officer commands delete this section if none
        oHelpEmbed= new discord.RichEmbed()
        .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
        .setColor("#3d7d05")
        .addBlankField()
        .addField(`${botConfig.prefix}addstrike`, `Adds a new strike \nType ${botConfig.prefix}addstrikehelp for more information`)
        .addField(`${botConfig.prefix}amendstrike`, `Amends addtional information to the strike \nType ${botConfig.prefix}amendstrikehelp for more information`)
        .addField(`${botConfig.prefix}lookupstrike`, `Looks up a strike \nType ${botConfig.prefix}lookupstrikehelp for more information`)
        ;sender.send(oHelpEmbed)
    }
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()
    .addField(`${botConfig.prefix}lookupmystrikes`, `Finds any strikes associated with your account`)
    .addField(`${botConfig.prefix}appealstrike`, `Apeals a strike \nType ${botConfig.prefix}appealstrikehelp for more information`)
    ;
    sender.send(mHelpEmbed);
}
module.exports.help = {
    name: "strikehelp"//Change to name of command
}