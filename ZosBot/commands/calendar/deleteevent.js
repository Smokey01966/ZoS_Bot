module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}deleteevent|(Event Number)|(Event Number)`);return;}//set number
    let eventNumber = args[0];
    let verify = args[1]
    let ref = firebase.database().ref("events")
    var eventRef =ref.child(eventNumber)
    if(eventNumber !== verify){sender.send("The event numbers did not match"); return;}
    eventRef.once("value")
            .then(function(snapshot) {
            let existsTest = snapshot.val() !== null
            if(existsTest){
                common.methods.displayEvent(ref, eventNumber, sender); 
                setTimeout(function(){
                eventRef.remove()
                sender.send("This event has been deleted")}, 500);
            } else{
                sender.send("That event does not exist")
            }
        });
}
module.exports.help = {
    name: "deleteevent"//Change to name of command
}