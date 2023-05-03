module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Approve Application Command Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}approveapplication|(Gw2Account)`)
    .addField("Gw2Account", "The Gw2Account associated with the application you wish to set to approved (application must be in submitted status)")
    .addField("Notification", "This command will also notify the applicant that their application has been accepted")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "approveapplicationhelp"//Change to name of command
}