module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Event Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addevent|(Event Date)|(Event Details)`)
    .addField("Event Date", `The date of the event must be in yyyy-mm-dd format`)
    .addField("Event Details", `Details on the event must be less than 900 characters in length`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addeventhelp"//Change to name of command
}