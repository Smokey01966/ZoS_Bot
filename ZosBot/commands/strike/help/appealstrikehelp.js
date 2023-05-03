module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Appeal Strike Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}appealstrike|(Strike Number)|(note)`)
    .addField("Strike Number", `The strike number of the strike you wish to appeal`)
    .addField("Note", `A note as to why the stike was appealed`)
    .addField("A note on status", `A strike can only be appealed if is has not been validated or overturned`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "validatestrikehelp"//Change to name of command
}