module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.elevatedOfficerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Validate Strike Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}validatestrike|(Strike Number)|(note)`)
    .addField("Strike Number", `The strike number of the strike you wish to validate`)
    .addField("Note", `A note as to why the stike was validated`)
    .addField("A note on status", `A strike can only be validated if is has been appealed`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "validatestrikehelp"//Change to name of command
}