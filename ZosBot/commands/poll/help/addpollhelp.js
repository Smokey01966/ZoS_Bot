module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Poll Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addpoll|(Question)|(Close Date)|(Rank Required to Vote)|(Number of Votes Per Person)`)
    .addField("Question", "The question you wish to ask")
    .addField("Close Date", "The date you wish the poll to close for voting")
    .addField("Rank Required to Vote", `must be either\n\"m\" to allow all members to vote and view the poll\n\"o\" to allow only ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")} to vote and view the poll\nor \"e\" to allow only${ranksConfig.data.elevatedOfficerRanks.join(" or ")} to vote and view the poll`)
    .addField("Number of Votes Per Person", "The number of votes each person gets")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addpollhelp"//Change to name of command
}