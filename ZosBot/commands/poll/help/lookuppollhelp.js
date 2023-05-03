module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Look Up Poll Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}lookuppoll|(Poll Number)`)
    .addField("Poll Number", "The number of the poll you wish to look up")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "lookuppollhelp"//Change to name of command
}