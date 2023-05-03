module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupbonustickets|(Gw2 Account)`);return;}//set number
    gw2AccountIn = args[0].toLowerCase();
    ticketnumbers=[]
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    lotRecRef=firebase.database().ref(`lottery/record/bonus/${gw2Account}`)
    lotoTicketRef=firebase.database().ref("lottery/tickets/bonus")
    lotRecRef.once("value").then(function(snapshot){
        if(snapshot.val()===null){existsTest="no";sender.send("This member does not have any lottery tickets assigned to them");return;}else{existsTest="yes"}
        numberOfTicketsBought=snapshot.val()
    }).then(function(){
        if(existsTest==="no"){return;}
        lotoTicketRef.orderByChild("Gw2 Account").equalTo(gw2Account).once("value").then(function(snapshot){
            snapshot.forEach(function(data){
                ticketnumbers.push(data.key)    
            })
            sender.send(`${gw2AccountIn} has ${numberOfTicketsBought} bonus tickets and the bonus ticket numbers ${ticketnumbers.join(" ")} are assinged to them`)
        })
    })

}
module.exports.help = {
    name: "lookupbonustickets"//Change to name of command
}