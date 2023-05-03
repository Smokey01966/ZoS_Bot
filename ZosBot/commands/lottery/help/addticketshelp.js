module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    let messageEmbed = new discord.RichEmbed()
    .setTitle("Add Tickets Command")
    .setColor("#3d7d05")
    .addField("Format", `${botConfig.prefix}addtickets|(Gw2Account)|(Number of Tickets to Assign)`)
    .addField("Gw2Account", "The member's Guild Wars2 account including the .####")
    .addField("Number of Tickets to Add", "How many lottery tickets you want to assign to the member")
    sender.send(messageEmbed);
}
module.exports.help = {
    name: "addticketshelp"//Change to name of command
}