module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Member Note Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addmembernote|(Gw2Account)|(Note)`)
    .addField("Gw2Account", "The Gw2Account of the member you wish to add the note to")
    .addField("Note", "The note you wish to add limited to 900 characters in length")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addmembernotehelp"//Change to name of command
}