module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Look Up Alt Account Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}lookupaltaccount|(Gw2Account)`)
    .addField("Gw2Account", "The Gw2 account you wish to search for\nIf the alt account returns the main account\nIf the main account returns any associated alt accounts")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "lookupaltaccounthelp"//Change to name of command
}