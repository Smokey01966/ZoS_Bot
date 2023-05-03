module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Link Member Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}linkmember|(Gw2Account)|(Discord Account)`)
    .addField("Gw2Account", "The member's Guild Wars2 account including the .####")
    .addField("Discord Account", "@Mention the discord user")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "linkmemberhelp"//Change to name of command
}