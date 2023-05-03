module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Invite Command Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}invite|(Gw2Account)`)
    .addField("Gw2Account", "The Gw2Account associated with the application you wish to set to invited (application must be in approved status)")
    .addField("Member Entry Creation", "This command will also create a new entry in the member database for applicant")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "invitehelp"//Change to name of command
}