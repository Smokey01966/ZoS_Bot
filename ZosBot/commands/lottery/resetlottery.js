module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}resetlottery|resetlottery`);return;}//set number
    verify=args[0]
    if(verify!=="resetlottery"){sender.send("The verification must match resetlottery exactly");return;}
    lotoPropRef=firebase.database().ref("lottery/properties")
    lotoRecRef=firebase.database().ref("lottery/record")
    lotoTicketRef=firebase.database().ref("lottery/tickets")
    lotoPropRef.child("bonus/Number of Tickets Bought").set("0")
    lotoPropRef.child("main/Number of Tickets Bought").set("0")
    lotoRecRef.remove()
    lotoTicketRef.remove()
    channel=bot.channels.find("name","lottery-drawing")
    channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
    sender.send("Lottery reset")

}
module.exports.help = {
    name: "resetlottery"//Change to name of command
}