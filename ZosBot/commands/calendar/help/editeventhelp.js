module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit Event Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editevent|(Event Number)|(Field)|(New Information)`)
    .addField("Event Number", `The number of the event you wish to edit`)
    .addField("Field", `The field you wish to edit can either be Event Date or Event Details`)
    .addField("New Information", `The new information you wish to override the curent information with`)
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editeventhelp"//Change to name of command
}