module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}addevent|(Date[format yyyy-mm-dd])|(Details)`);return;}//set number
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    //gw2Account
    let date = args[0];
    if(common.methods.isValidDate(date)==="no"){sender.send(`The date field is not a valid date it must be formated yyyy-mm-dd`);return;}
    //details
    let details = args[1]
    if(details.length > 900){sender.send("The details can only be 900 characters long");return;}
    ref = firebase.database().ref("events")
    ref.push({
        "Event Date": date,
        "Event Details": details,
        "search string": `${date}${details}`
    }).then(function(){
        ref.orderByChild("search string").equalTo(`${date}${details}`).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            eventNumber = data.key
        searchRef =ref.child(`${eventNumber}/search string`)
        searchRef.remove()
        common.methods.displayEvent(ref, eventNumber, sender)
        })}    
    })
    })

}
module.exports.help = {
    name: "addevent"//Change to name of command
}