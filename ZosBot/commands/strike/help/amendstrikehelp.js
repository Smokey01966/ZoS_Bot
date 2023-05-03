module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Amend Strike Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}amendstrike|(Strike Number)|(Note)`)
    .addField("Strike Number", `The strike number you wish to amend a note to`)
    .addField("Note", `The note you wish to amend`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "amendstrikehelp"//Change to name of command
}