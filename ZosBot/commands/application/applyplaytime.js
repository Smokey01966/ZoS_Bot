module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send("Incorrect number of arguments for this command");return;}//set number
    let playtime=args[0]
    if(playtime===""){sender.send("Opps looks like you forgot to include your playtime");return;}
    if(playtime.length > 900){sender.send("Application entries can only be 900 characters long");return;}
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        status=(snapshot.child("Status").val())
        if(status!=="Need Playtime"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        appRef.child("Play Time").set(playtime)
        appRef.child("Status").set("Need Play Style")
        sender.send("The next item we will need to know is your play style\nWeather you prefer PVP, PVE, or WVW and your accomplishments and professions played in these game modes\nTo add this to your application type\"/applyplaystyle|\"Your Play Style Here")
    })
}
module.exports.help = {
    name: "applyplaytime"//Change to name of command
}