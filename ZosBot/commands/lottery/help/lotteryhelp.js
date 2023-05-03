module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Lottery Commands")
    .setColor("#3d7d05");
    sender.send(helpEmbed)
    if(common.methods.officerCheck(message) === "yes"){
        //officer commands delete this section if none
        oHelpEmbed= new discord.RichEmbed()
        .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
        .setColor("#3d7d05")
        .addBlankField()
        .addField(`${botConfig.prefix}addtickets`, `Assignes ticket numbers to a member \nType ${botConfig.prefix}addticketshelp for more information`)
        .addField(`${botConfig.prefix}addbonustickets`, `Assignes bonus ticket numbers to a member \nType ${botConfig.prefix}addbonusticketshelp for more information`)
        .addField(`${botConfig.prefix}drawlottery`, `Draws a winner from the lottery and posts it in the lottery drawing channel`)
        .addField(`${botConfig.prefix}drawbonuslottery`, `Draws a winner from the bonus lottery and posts it in the lottery drawing channel`)
        .addField(`${botConfig.prefix}editnumberoftickets`, `Changes the maximum number of tickets per person \nType ${botConfig.prefix}editnumberofticketshelp for more information`)
        .addField(`${botConfig.prefix}editnumberofbonustickets`, `Changes the maximum number of bonus tickets per person \nType ${botConfig.prefix}editnumberofbonusticketshelp for more information`)
        .addField(`${botConfig.prefix}lookuptickets`, `Looks up how many tickets a member has and what ticket numbers are assigned to them \nFormat ${botConfig.prefix}lookuptickets|(Gw2 Account)`)
        .addField(`${botConfig.prefix}lookupbonustickets`, `Looks up how many bonus tickets a member has and what bonus ticket numbers are assigned to them \nFormat ${botConfig.prefix}lookupbonustickets|(Gw2 Account)`)
        .addField(`${botConfig.prefix}resetlottery`, `Clears out all assinged tickets\nClears the lottery drawing channel\nMust be typed as ${botConfig.prefix}resetlottery|resetlottery`)

        ;
        sender.send(oHelpEmbed)
    }
}
module.exports.help = {
    name: "lotteryhelp"//Change to name of command
}