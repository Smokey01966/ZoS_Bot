module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send("Incorrect number of arguments for this command");return;}//set number
    let playstyle=args[0]
    if(playstyle===""){sender.send("Opps looks like you forgot to include your play style");return;}
    if(playstyle.length > 900){sender.send("Application entries can only be 900 characters long");return;}
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        status=(snapshot.child("Status").val())
        if(status!=="Need Play Style"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        appRef.child("Play Style").set(playstyle)
        appRef.child("Status").set("Need Past Guilds")
        sender.send("The next item we will need to know is any guilds you belonged to in the past any why you may have left them\nTo add this to your application type\"/applypastguilds|\"Your Past Guilds Here")
    })
}
module.exports.help = {
    name: "applyplaystyle"//Change to name of command
}