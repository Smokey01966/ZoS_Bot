module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Section Commands")
    .setColor("#3d7d05");
    sender.send(helpEmbed)
    if(common.methods.elevatedOfficerCheck(message) === "yes"){
         //restricted officer commands delete this section if none
         eHelpEmbed= new discord.RichEmbed()
         .setTitle(`${ranksConfig.data.elevatedOfficerRanks.join(" ")} Commands`)
         .setColor("#3d7d05")
         .addBlankField()
         .addField(`${botConfig.prefix}rCommand`, `Discription \nType ${botConfig.prefix}(Command)help for more information`)
         ;
         sender.send(eHelpEmbed)
    }
    if(common.methods.officerCheck(message) === "yes"){
        //officer commands delete this section if none
        oHelpEmbed= new discord.RichEmbed()
        .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
        .setColor("#3d7d05")
        .addBlankField()
        .addField(`${botConfig.prefix}oCommand`, `Discription \nType ${botConfig.prefix}(Command)help for more information`)
        ;
        sender.send(oHelpEmbed)
    }
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()
    .addField(`${botConfig.prefix}Command`, `Discription \nType ${botConfig.prefix}(Command)help for more information`)
    ;
    sender.send(mHelpEmbed);
}
module.exports.help = {
    name: "command name"//Change to name of command
}