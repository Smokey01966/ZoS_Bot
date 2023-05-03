module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    sender.send("pong")
}
module.exports.help = {
    name: "ping"//Change to name of command
}