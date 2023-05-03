module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Application Commands")
    .setColor("#3d7d05");
    sender.send(helpEmbed)
    if(common.methods.officerCheck(message) === "yes"){
        //officer commands delete this section if none
        oHelpEmbed= new discord.RichEmbed()
        .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
        .setColor("#3d7d05")
        .addBlankField()
        .addField(`${botConfig.prefix}lookupapplication`, `Finds an application \nType ${botConfig.prefix}lookupapplicationhelp for more information`)
        .addField(`${botConfig.prefix}editapplication`, `Edit information in a application \nType ${botConfig.prefix}editapplicationhelp for more information`)
        .addField(`${botConfig.prefix}deleteapplication`, `Deletes an application \nType ${botConfig.prefix}deleteapplicationhelp for more information`)
        .addField(`${botConfig.prefix}pendapplication`, `Sets an application to the pending status \nType ${botConfig.prefix}pendapplicationhelp for more information`)
        .addField(`${botConfig.prefix}approveapplication`, `Sets an application to the approved status \nType ${botConfig.prefix}approveapplicationhelp for more information`)
        .addField(`${botConfig.prefix}invite`, `Sets an application to the invited status and creates a member entry from the relevant fields in the application \nType ${botConfig.prefix}invitehelp for more information`)
        ;
        sender.send(oHelpEmbed)
    }
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()
    .addField(`${botConfig.prefix}apply`, `Starts an application to join ZoS you will be guided through the steps of this command`)
    .addField(`${botConfig.prefix}lookupmyapplication`, `Finds your application`)
    .addField(`${botConfig.prefix}editmyapplication`, `Allows you to change some information in your application\nCan only be done if application is in submitted or pending status\nType ${botConfig.prefix}editmyapplicationhelp for more information`)
    ;
    sender.send(mHelpEmbed);
}
module.exports.help = {
    name: "applicationhelp"//Change to name of command
}