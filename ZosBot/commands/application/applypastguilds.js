module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send("Incorrect number of arguments for this command");return;}//set number
    let pastGuilds=args[0]
    if(pastGuilds===""){sender.send("Opps looks like you forgot to include your past guilds");return;}
    if(pastGuilds.length > 900){sender.send("Application entries can only be 900 characters long");return;}
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        status=(snapshot.child("Status").val())
        if(status!=="Need Past Guilds"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        appRef.child("Past Guilds").set(pastGuilds)
        appRef.child("Status").set("Need Reason")
        sender.send("The next item we will need to know is why you are interested in applying to ZoS\nTo add this to your application type\"/applyreason|\"Your Reason for Applying Here")
    })
}
module.exports.help = {
    name: "applypastguilds"//Change to name of command
}