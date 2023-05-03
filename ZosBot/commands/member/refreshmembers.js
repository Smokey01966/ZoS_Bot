module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}refreshmembers`);return;}//set number
    sender.send("Refreshing Members")
    common.methods.refreshmembers(message)
}
module.exports.help = {
    name: "refreshmembers"//Change to name of command
}