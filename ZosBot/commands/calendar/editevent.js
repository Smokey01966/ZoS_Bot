module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 3){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editevent(Event Number)|(Field)|(Data)`);return;}//set number
    let eventNumber=args[0]
    let field=args[1]
    feildCheck=0
    if(field === "Event Date"){feildCheck=1}
    if(field === "Event Details"){feildCheck=1}
    if(feildCheck===0){sender.send("That is not a valid field");return;}
    let newInfo=args[2]
    if(field==="Event Date"){
        if(common.methods.isValidDate(newInfo)==="no"){sender.send(`The date field is not a valid date it must be formated yyyy-mm-dd`);return;}
    }
    if(field==="Eent Details"){
        if(newInfo.length > 900){sender.send("The details can only be 900 characters long");return;}
    }
    ref = firebase.database().ref("events")
    ref.once("value", function(snapshot){
        if(snapshot.hasChild(eventNumber)){eventTest="yes"}else{eventTest="no"}
    }).then(function(){
        if(eventTest==="no"){sender.send("Could not find that event");return;}
        editref =ref.child(`${eventNumber}/${field}`)
        editref.set(newInfo)
    }).then(function(){
        sender.send("Event Updated")
        common.methods.displayEvent(ref, eventNumber, sender)
    })
}
module.exports.help = {
    name: "editevent"//Change to name of command
}