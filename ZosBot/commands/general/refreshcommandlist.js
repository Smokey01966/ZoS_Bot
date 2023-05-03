module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){channel.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){channel.send("Incorrect number of arguments for this command");return;}//set number
    channel=bot.channels.find("name","zos-bot-command-list")
    channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
    let memberHelpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Commands")
    .setColor("#3d7d05")
    .addField("Command Format", `All commands are preceded by ${botConfig.prefix}. | is used to break up elements of a command. Commands can be entered in a text chanel or DMed to the bot, but their results will always be DMed to you`)
    .addField("Member Module", `Type ${botConfig.prefix}memberhelp for more information`)
    .addField("Strike Module", `Type ${botConfig.prefix}strikehelp for more information`)
    .addField("Calendar Module", `Type ${botConfig.prefix}calendarhelp for more information`)
    .addField("Application Module", `Type ${botConfig.prefix}applicationhelp for more information`)
    .addField("Poll Module", `Type ${botConfig.prefix}pollhelp for more information`);
        memberHelpEmbed.addField(`Moderation Module`, `Type ${botConfig.prefix}moderationhelp for more information`)
        memberHelpEmbed.addField(`Lottery Module`, `Type ${botConfig.prefix}lotteryhelp for more information`)
    channel.send(memberHelpEmbed);
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Member Commands")
    .setColor("#3d7d05");
    channel.send(helpEmbed)
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
        channel.send(eHelpEmbed)
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()
    .addField(`${botConfig.prefix}lookupmyself`, `Finds your Member entry`)
    .addField(`${botConfig.prefix}editmyself`, `Allows you to edit certian fields in your Member entry \nType ${botConfig.prefix}editmyselfhelp for more information`)
    ;
    channel.send(mHelpEmbed);
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Strike Commands")
    .setColor("#3d7d05");
    channel.send(helpEmbed)
         //restricted officer commands delete this section if none
         eHelpEmbed= new discord.RichEmbed()
         .setTitle(`${ranksConfig.data.elevatedOfficerRanks.join(" ")} Commands`)
         .setColor("#3d7d05")
         .addBlankField()
         .addField(`${botConfig.prefix}overturnstrike`, `Overturns the strike \nType ${botConfig.prefix}overturnstrikehelp for more information`)
         .addField(`${botConfig.prefix}validatestrike`, `Validates the strike \nType ${botConfig.prefix}validatestrikehelp for more information`)
         ;
         channel.send(eHelpEmbed)
        //officer commands delete this section if none
        oHelpEmbed= new discord.RichEmbed()
        .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
        .setColor("#3d7d05")
        .addBlankField()
        .addField(`${botConfig.prefix}adddstrike`, `Adds a new strike \nType ${botConfig.prefix}addstrikehelp for more information`)
        .addField(`${botConfig.prefix}amendstrike`, `Amends addtional information to the strike \nType ${botConfig.prefix}amendstrikehelp for more information`)
        .addField(`${botConfig.prefix}lookupstrike`, `Looks up a strike \nType ${botConfig.prefix}lookupstrikehelp for more information`)
        ;channel.send(oHelpEmbed)
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()
    .addField(`${botConfig.prefix}lookupmystrikes`, `Finds any strikes associated with your account`)
    .addField(`${botConfig.prefix}appealstrike`, `Apeals a strike \nType ${botConfig.prefix}appealstrikehelp for more information`)
    ;
    channel.send(mHelpEmbed); 
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Calendar Commands")
    .setColor("#3d7d05");
    channel.send(helpEmbed)
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
        channel.send(oHelpEmbed)
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()    .addField(`${botConfig.prefix}lookupevent`, `Finds and event \nType ${botConfig.prefix}lookupeventhelp for more information`)
    .addField(`${botConfig.prefix}lookupguildmessage`, `Finds the guildmessage for a day of the week \nType ${botConfig.prefix}lookupguildmessagehelp for more information`)
    ;
    channel.send(mHelpEmbed);
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Application Commands")
    .setColor("#3d7d05");
    channel.send(helpEmbed)
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
        channel.send(oHelpEmbed)
    //regular commands
    mHelpEmbed= new discord.RichEmbed()
    .setTitle(`Member Commands`)
    .setColor("#3d7d05")
    .addBlankField()
    .addField(`${botConfig.prefix}apply`, `Starts an application to join ZoS you will be guided through the steps of this command`)
    .addField(`${botConfig.prefix}lookupmyapplication`, `Finds your application`)
    .addField(`${botConfig.prefix}editmyapplication`, `Allows you to change some information in your application\nCan only be done if application is in submitted or pending status\nType ${botConfig.prefix}editmyapplicationhelp for more information`)
    ;
    channel.send(mHelpEmbed);
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Poll Commands")
    .setColor("#3d7d05");
    channel.send(helpEmbed)
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
    channel.send(mHelpEmbed);
    helpEmbed = new discord.RichEmbed()
    .setTitle("Zos Bot Moderation Commands")
    .setColor("#3d7d05");
    channel.send(helpEmbed)
         //restricted officer commands delete this section if none
         eHelpEmbed= new discord.RichEmbed()
         .setTitle(`${ranksConfig.data.elevatedOfficerRanks.join(" ")} Commands`)
         .setColor("#3d7d05")
         .addBlankField()
         .addField(`${botConfig.prefix}clearchannel`, `Clears the chat channel that the command is typed in \n Must include |clearchannel after the command \nOnly clears text less than 14 day old`)
         .addField(`${botConfig.prefix}refreshautoclear`, `Forces the automated channel clearing to run before its scheduled time`)
         .addField(`${botConfig.prefix}refreshamotd`, `Forces the arch message of the day to refresh before its scheduled time`)
         ;
         channel.send(eHelpEmbed)
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
        channel.send(oHelpEmbed)
        helpEmbed = new discord.RichEmbed()
        .setTitle("Zos Bot Lottery Commands")
        .setColor("#3d7d05");
        channel.send(helpEmbed)
            //officer commands delete this section if none
            oHelpEmbed= new discord.RichEmbed()
            .setTitle(`${ranksConfig.data.officerRanks.join(" ")} Commands`)
            .setColor("#3d7d05")
            .addBlankField()
            .addField(`${botConfig.prefix}addtickets`, `Assignes ticket numbers to a member \nType ${botConfig.prefix}addticketshelp for more information`)
            .addField(`${botConfig.prefix}addbonustickets`, `Assignes bonus ticket numbers to a member \nType ${botConfig.prefix}addbonusticketshelp for more information`)
            .addField(`${botConfig.prefix}addtickets`, `Assignes ticket numbers to a member \nType ${botConfig.prefix}addticketshelp for more information`)
            .addField(`${botConfig.prefix}drawlottery`, `Draws a winner from the lottery and posts it in the lottery drawing channel`)
            .addField(`${botConfig.prefix}drawbonuslottery`, `Draws a winner from the bonus lottery and posts it in the lottery drawing channel`)
            .addField(`${botConfig.prefix}editnumberoftickets`, `Changes the maximum number of tickets per person \nType ${botConfig.prefix}editnumberofticketshelp for more information`)
            .addField(`${botConfig.prefix}editnumberofbonustickets`, `Changes the maximum number of bonus tickets per person \nType ${botConfig.prefix}editnumberofbonusticketshelp for more information`)
            .addField(`${botConfig.prefix}lookuptickets`, `Looks up how many tickets a member has and what ticket numbers are assigned to them \nFormat ${botConfig.prefix}lookuptickets|(Gw2 Account)`)
            .addField(`${botConfig.prefix}lookupbonustickets`, `Looks up how many bonus tickets a member has and what bonus ticket numbers are assigned to them \nFormat ${botConfig.prefix}lookupbonustickets|(Gw2 Account)`)
            .addField(`${botConfig.prefix}resetlottery`, `Clears out all assinged tickets\nClears the lottery drawing channel\nMust be typed as ${botConfig.prefix}resetlottery|resetlottery`)
    
            ;
            channel.send(oHelpEmbed)
}
module.exports.help = {
    name: "refreshcommandlist"//Change to name of command
}