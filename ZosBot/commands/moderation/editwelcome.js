module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editwelcome|(New Welcome Message)`);return;}//set number
    welcome=args[0]
    if(welcome.length > 900){sender.send("Welcome message can not be longer than 900 characters"); return}
    ref=firebase.database().ref("welcome/message")
    ref.set(welcome)
    sender.send(`Welcome message set to ${welcome}`)

}
module.exports.help = {
    name: "editwelcome"//Change to name of command
}