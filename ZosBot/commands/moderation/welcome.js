module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}welcome`);return;}//set number
    ref=firebase.database().ref("welcome/message")
    ref.once("value", function(snapshot){
        welcome=snapshot.val()
        sender.send(welcome)
    })

}
module.exports.help = {
    name: "welcome"//Change to name of command
}