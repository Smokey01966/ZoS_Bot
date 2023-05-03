module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Member Commands")
    .setColor("#3d7d05");
    sender.send(helpEmbed)
    if(common.methods.officerCheck(message) === "yes"){
        //officer commands
        eHelpEmbed= new discord.RichEmbed()
        .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
        .setColor("#3d7d05")
        .addBlankField()
        .addField(`${botConfig.prefix}addmember`, `Adds a member \nType ${botConfig.prefix}addmemberhelp for more information`)
        .addField(`${botConfig.prefix}nodisaddmember`, `Adds a member with out a discord account \nType ${botConfig.prefix}nodisaddmemberhelp for more information`)
        .addField(`${botConfig.prefix}editmember`, `Edits a member \nType ${botConfig.prefix}edditmemberhelp for more information`)
        .addField(`${botConfig.prefix}deletemember`, `Removes a member \nType ${botConfig.prefix}deletememberhelp for more information`)
        .addField(`${botConfig.prefix}lookupmember`, `Finds a member \nType ${botConfig.prefix}lookupmemberhelp for more information`)
        .addField(`${botConfig.prefix}superlookup`, `Finds a member's application, member entry, alt account information, strikes, and notes \nFormat ${botConfig.prefix}superlookup|(Gw2 Account)`)
        .addField(`${botConfig.prefix}lookupmembernotes`, `Finds notes on a member \nType ${botConfig.prefix}lookupmembernoteshelp for more information`)
        .addField(`${botConfig.prefix}addmembernote`, `Adds a note to a member \nType ${botConfig.prefix}addmembernotehelp for more information`)
        .addField(`${botConfig.prefix}addaltaccount`, `Adds an alt acount entry \nType ${botConfig.prefix}addaltaccounthelp for more information`)
        .addField(`${botConfig.prefix}lookupaltaccount`, `Finds an alt acount entry \nType ${botConfig.prefix}lookupaltaccounthelp for more information`)
        .addField(`${botConfig.prefix}deletealtaccount`, `Removes an alt account entry \nType ${botConfig.prefix}deletealtaccounthelp for more information`)
        .addField(`${botConfig.prefix}refreshmembers`, "Forces a sync between Member entries and discord roles")
        .addField(`${botConfig.prefix}linkmember`, `Links a discord user to a member entry without a discord account \nType ${botConfig.prefix}linkmemberhelp for more information`)
        ;
        sender.send(eHelpEmbed)
    }
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()
    .addField(`${botConfig.prefix}lookupmyself`, `Finds your Member entry`)
    .addField(`${botConfig.prefix}editmyself`, `Allows you to edit certian fields in your Member entry \nType ${botConfig.prefix}editmyselfhelp for more information`)
    ;
    sender.send(mHelpEmbed);
}
module.exports.help = {
    name: "memberhelp"//Change to name of command
}