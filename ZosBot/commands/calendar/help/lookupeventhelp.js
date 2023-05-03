module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Look Up Event Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}lookupevent|(Field)|(Data)`)
    .addField("Field", `The field you wish to search in can be Event Date or Event Details if left blank defaults to date and searches for the current date`)
    .addField("Data", `The data you wish to search for`)
    .addField("Event Date", `The date of the event must be in yyyy-mm-dd format`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "lookupeventhelp"//Change to name of command
}