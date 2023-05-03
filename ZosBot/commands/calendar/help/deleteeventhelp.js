module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Delete Event Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}deleteevent|(Event Number)|(Event Number)`)
    .addField("Event Number", `The event number of the event you wish to delete must match exactly`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "deleteeventhelp"//Change to name of command
}