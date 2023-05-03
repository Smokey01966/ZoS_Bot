module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== ){sender.send("Incorrect number of arguments for this command");return;}//set number
    //code
}
module.exports.help = {
    name: "Name of Comand"//Change to name of command
}