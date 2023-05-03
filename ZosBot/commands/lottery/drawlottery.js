module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}drawlottery`);return;}//set number
    lotoPropRef=firebase.database().ref("lottery/properties/main")
    lotoTicketRef=firebase.database().ref("lottery/tickets/main")
    lotoPropRef.once("value").then(function(snapshot){
        numberOfTicketBought=Number(snapshot.child("Number of Tickets Bought").val())
    }).then(function(){
        winningTicketNumber=Math.floor(Math.random()*(numberOfTicketBought-1+1))+1
        lotoTicketRef.child(winningTicketNumber).once("value").then(function(snapshot){
            gw2AccountDis = `${snapshot.child("Gw2 Account").val().slice(0,-4)}.${snapshot.child("Gw2 Account").val().slice(-4)}`
            channel=bot.channels.find("name","lottery-drawing")
            channel.send(`Lottery ticket number ${winningTicketNumber} drawn ${gw2AccountDis} wins!`)
        })
    })
}
module.exports.help = {
    name: "drawlottery"//Change to name of command
}