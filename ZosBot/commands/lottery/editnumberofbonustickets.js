module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editnumberofbonustickets|(Number of Tickets)`);return;}//set number
    numberOfTickets = args[0]
    numberTicketsPat= new RegExp("^\\d{1,45}$")
    if(!numberTicketsPat.test(numberOfTickets)){
        if(numberOfTickets===""){
            numberOfTickets="Unlimited"
        }else{
            sender.send("Number of tickets is not correct this must be a number or blank");return;
        }
    };
    ref=firebase.database().ref("lottery/properties/bonus")
    ref.child("Number of Tickets Per Person").set(numberOfTickets)
    sender.send(`Number of bonus lottery tickets per person set to ${numberOfTickets}`)
}
module.exports.help = {
    name: "editnumberofbonustickets"//Change to name of command
}