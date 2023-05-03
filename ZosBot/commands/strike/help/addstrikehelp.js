module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Strike Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addstrike|(Gw2 Account)|(note)`)
    .addField("Gw2 Account", `The Gw2 Account of the member to be issued the strike`)
    .addField("Note", `A note as to why the stike was issued`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addstrikehelp"//Change to name of command
}