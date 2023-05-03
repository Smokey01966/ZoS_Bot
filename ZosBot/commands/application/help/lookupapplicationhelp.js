module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Look Up Application Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}lookupapplication|(Field)|(Search)`)
    .addField("Field", `The field you wish to search under can be \n    Gw2 Account\n    Discord Account\n    Age\n    Play Time\n    Play Style\n    Past Guilds\n    Reason for Applying\n    About Me\n    Status\n    Notes`)
    .addField("Search", "The information you are searching for only does exact matching")
    .addField("Application Statuses", "Applications can have the status of \n    Submitted\n    Pending\n    Approved\n    Invited")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "lookupapplicationhelp"//Change to name of command
}