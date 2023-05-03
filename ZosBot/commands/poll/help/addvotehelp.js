module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Vote Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addvote|(Poll Number)|(Vote)<-Repeat this for each vote you wish to cast`)
    .addField("Poll Number", "The number of the poll you wish to vote in")
    .addField("Vote", "The number of the option you wish to vote for repeat the \"|vote\" argument for each item you wish to vote for\nYou can only vote for each option once and you can only cast as many votes as the Votes Per Person setting")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addvotehelp"//Change to name of command
}