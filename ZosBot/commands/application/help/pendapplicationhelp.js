module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Pend Application Command Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}pendapplication|(Gw2Account)|(Reason)`)
    .addField("Gw2Account", "The Gw2Account associated with the application you wish to set to pending (application must be in submitted status)")
    .addField("Reason", "The reason the application was put into pending status.\nWill be stored in the notes section also will be sent to applicant with instructions on how to make changes to and resubmit the application")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "pendapplicationhelp"//Change to name of command
}