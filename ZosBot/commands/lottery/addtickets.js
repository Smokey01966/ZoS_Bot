module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}addtickets|(Gw2 Account)|(Number of Tickets)`);return;}//set number
    gw2AccountIn = args[0].toLowerCase();
    numberOfTickets =Number(args[1]);
    lotoTicketsGiven=[]
    numberTicketsPat= new RegExp("^\\d{1,45}$")
    if(!numberTicketsPat.test(numberOfTickets)){sender.send("Number of tickets is not correct this must be a number");return;}
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    memRef = firebase.database().ref(`members/${gw2Account}`)
    lotoPropRef=firebase.database().ref("lottery/properties/main")
    lotoRecRef=firebase.database().ref(`lottery/record/main/${gw2Account}`)
    lotoTicketRef=firebase.database().ref("lottery/tickets/main")
    memRef.once("value").then(function(snapshot){
        existsTest = snapshot.val() !== null
    }).then(function(){
        if(!existsTest){sender.send("This member does not exist");return;}
        lotoPropRef.once("value").then(function(snapshot){
            numberOfTicketsPerPerson=Number(snapshot.child("Number of Tickets Per Person").val());
            numberOfTicketBought=Number(snapshot.child("Number of Tickets Bought").val())
        })
    }).then(function(){
                lotoRecRef.once("value").then(function(snapshot){
                    if(snapshot.val()===null){curentNumberOfTickets=0}else{curentNumberOfTickets=Number(snapshot.val())}
                    newNumberOfTickets=curentNumberOfTickets+numberOfTickets
                    newNumberOfTicketsBought=numberOfTicketBought+numberOfTickets
                    if(numberOfTicketsPerPerson==="Unlimited"){
                        lotoRecRef.set(newNumberOfTickets)
                        lotoPropRef.child("Number of Tickets Bought").set(newNumberOfTicketsBought)
                        for(n=0; n<numberOfTickets; n++){
                            numberOfTicketBought++
                            lotoTicketRef.child(numberOfTicketBought).set({"Gw2 Account": gw2Account})
                            lotoTicketsGiven.push(numberOfTicketBought)
                        }
                        sender.send(`${gw2AccountIn} has had the ticket number(s) ${lotoTicketsGiven.join(" ")} assigned to them`)
                    }else{
                        if(newNumberOfTickets>numberOfTicketsPerPerson){sender.send(`This lottery is limited to ${numberOfTicketsPerPerson} tickets per person \nAdding ${numberOfTickets} to ${gw2AccountIn} would give them ${newNumberOfTickets}\n${gw2AccountIn} can only be given ${numberOfTicketsPerPerson-curentNumberOfTickets} more tickets`);return;}
                        lotoRecRef.set(newNumberOfTickets)
                        lotoPropRef.child("Number of Tickets Bought").set(newNumberOfTicketsBought)
                        for(n=0; n<numberOfTickets; n++){
                            numberOfTicketBought++
                            lotoTicketRef.child(numberOfTicketBought).set({"Gw2 Account": gw2Account})
                            lotoTicketsGiven.push(numberOfTicketBought)
                        }
                        sender.send(`${gw2AccountIn} has had the ticket number(s) ${lotoTicketsGiven.join(" ")} assigned to them`)
                    }
                })
            })
}
module.exports.help = {
    name: "addtickets"//Change to name of command
}