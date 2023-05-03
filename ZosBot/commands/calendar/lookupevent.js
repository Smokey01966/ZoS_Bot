module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupevent|(Field[if left blank defaults to event number])|(Data)`);return;}//set number
    let field = args [0];
    let eData = args[1];
    let eventNumber = "";
    let data ="";
    ref = firebase.database().ref("events")
    if(field !== ""){
        feildCheck=0
        if(field === "Event Date"){feildCheck=1}
        if(field === "Event Details"){feildCheck=1}
        if(feildCheck===0){sender.send("That is not a valid field");return;}
        ref.orderByChild(field).equalTo(eData).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            eventNumber = data.key
            common.methods.displayEvent(ref, eventNumber, sender)})}else{sender.send("Could not find a match")}  
    })
    }else
    {
        eventNumber = eData
        var eventRef =ref.child(eventNumber)
        eventRef.once("value")
        .then(function(snapshot) {
        let existsTest = snapshot.val() !== null
        if(existsTest){
            common.methods.displayEvent(ref, eventNumber, sender)
    }else{sender.send("Could not find a match")}
    });  
        }
}
module.exports.help = {
    name: "lookupevent"//Change to eData of command
}