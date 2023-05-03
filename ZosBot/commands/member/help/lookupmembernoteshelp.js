module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Look Up Member Notes Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}lookupmembernotes|(Gw2Account)`)
    .addField("Gw2Account", "The Gw2Account of the member you wish to look up notes for")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "lookupmembernoteshelp"//Change to name of command
}