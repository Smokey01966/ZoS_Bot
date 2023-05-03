module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Edit Number of Bonus Tickets Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}editnumberofbonustickets|(Number of Tickets Per Person)`)
    .addField("Number of Tickets Per Person", "How many bonus lottery tickets can be assigned to each person\nIf left blank defaults to Unlimited")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "editnumberofbonusticketshelp"//Change to name of command
}