module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Member Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addmember|(Gw2Account)|(Discord Account)|(${memberFieldsConfig.data.restrictedEditFields.join(")|(")})`)
    .addField("Gw2Account", "The member's Guild Wars2 account including the .#### Must Be Included")
    .addField("Discord Account", "@Mention the member's discord account must be included")
    .addField("Rank", `The member's rank If left blank defaults to Initiate\nAdditionally rank must be\n    ${ranksConfig.data.memberRanks.join("\n    ")}`)
    .addField("Birthday", "The member's birthday (Format mm-dd) If left blank defaults to Not Given")
    .addField("Date Joined", "The date the Member joined (Format yyyy-mm-dd) If left blank defaults to the current date")
    .addField("Other Fields", memberFieldsConfig.data.customFormatting.join("\n"));
    
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addmemberhelp"//Change to name of command
}