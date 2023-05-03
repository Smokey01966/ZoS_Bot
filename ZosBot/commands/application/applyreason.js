module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send("Incorrect number of arguments for this command");return;}//set number
    let reason=args[0]
    if(reason===""){sender.send("Opps looks like you forgot to include the reason you want to apply to ZoS");return;}
    if(reason.length > 900){sender.send("Application entries can only be 900 characters long");return;}
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        status=(snapshot.child("Status").val())
        if(status!=="Need Reason"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        appRef.child("Reason for Applying").set(reason)
        appRef.child("Status").set("Need About Me")
        sender.send("The next item we will need to know is a little about yourself\nTo add this to your application type\"/applyaboutme|\"Your About me Here")
    })
}
module.exports.help = {
    name: "applyreason"//Change to name of command
}