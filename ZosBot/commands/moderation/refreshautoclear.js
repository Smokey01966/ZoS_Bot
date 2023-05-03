module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.elevatedOfficerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}refreshautoclear|refreashautoclear`);return;}//set number
    verify=args[0]
    if(verify!=="refreshautoclear"){sender.send("The verification must exactly match \"refreshautoclear\"");return;}
    automation.methods.autoClear()
}
module.exports.help = {
    name: "refreshautoclear"//Change to name of command
}