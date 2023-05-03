module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Poll Commands")
    .setColor("#3d7d05");
    sender.send(helpEmbed)
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()
    .addField(`${botConfig.prefix}addpoll`, `Creates a new poll \nType ${botConfig.prefix}addpollhelp for more information`)
    .addField(`${botConfig.prefix}editpollproperties`, `Edits the properties of a poll \nType ${botConfig.prefix}editpollpropertieshelp for more information`)
    .addField(`${botConfig.prefix}publishpoll`, `Opens the poll to voting \nType ${botConfig.prefix}publishpollhelp for more information`)
    .addField(`${botConfig.prefix}closepoll`, `Closes the poll to voting \nType ${botConfig.prefix}closepollhelp for more information`)
    .addField(`${botConfig.prefix}deletepoll`, `Discription \nType ${botConfig.prefix}deletepollhelp for more information`)
    .addField(`${botConfig.prefix}addpolloption`, `Adds an option to a poll \nType ${botConfig.prefix}addpolloptionhelp for more information`)
    .addField(`${botConfig.prefix}deletepolloption`, `Removes an option from a poll \nType ${botConfig.prefix}deletepolloptionhelp for more information`)
    .addField(`${botConfig.prefix}editpolloption`, `Discription \nType ${botConfig.prefix}editpolloptionhelp for more information`)
    .addField(`${botConfig.prefix}lookuppoll`, `Finds a poll \nType ${botConfig.prefix}lookuppollhelp for more information`)
    .addField(`${botConfig.prefix}addvote`, `Adds a vote to a poll \nType ${botConfig.prefix}addvotehelp for more information`)
    .addField(`${botConfig.prefix}editvote`, `Changes a vote in a poll \nType ${botConfig.prefix}editvotehelp for more information`)
    ;
    sender.send(mHelpEmbed);
}
module.exports.help = {
    name: "pollhelp"//Change to name of command
}