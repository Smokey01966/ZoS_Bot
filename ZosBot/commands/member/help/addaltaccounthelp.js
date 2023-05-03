module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Alt Account Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addaltaccount|(Main Gw2Account)|(Alt Gw2Account)|`)
    .addField("Main Gw2Account", "The member's main Guild Wars2 account including the .####")
    .addField("Alt Gw2Account", "The member's alternate Guild Wars2 account you wish to add including the .####")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addaltaccounthelp"//Change to name of command
}