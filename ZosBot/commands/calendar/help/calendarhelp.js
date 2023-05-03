module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Calendar Commands")
    .setColor("#3d7d05");
    sender.send(helpEmbed)
    if(common.methods.officerCheck(message) === "yes"){
        //officer commands delete this section if none
        oHelpEmbed= new discord.RichEmbed()
        .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
        .setColor("#3d7d05")
        .addBlankField()
        .addField(`${botConfig.prefix}addevent`, `Adds an event \nType ${botConfig.prefix}addeventhelp for more information`)
        .addField(`${botConfig.prefix}editevent`, `Edits an event \nType ${botConfig.prefix}editeventhelp for more information`)
        .addField(`${botConfig.prefix}deleteevent`, `Edits an event \nType ${botConfig.prefix}deleteventhelp for more information`)
        .addField(`${botConfig.prefix}editguildmessage`, `Edits the guild message \nType ${botConfig.prefix}editguildmessagehelp for more information`)
        ;
        sender.send(oHelpEmbed)
    }
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()    .addField(`${botConfig.prefix}lookupevent`, `Finds and event \nType ${botConfig.prefix}lookupeventhelp for more information`)
    .addField(`${botConfig.prefix}lookupguildmessage`, `Finds the guildmessage for a day of the week \nType ${botConfig.prefix}lookupguildmessagehelp for more information`)
    ;
    sender.send(mHelpEmbed);
}
module.exports.help = {
    name: "calendarhelp"//Change to name of command
}