module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send("Incorrect number of arguments for this command");return;}//set number
    let age=args[0]
    if(age===""){sender.send("Opps looks like you forgot to include your age");return;}
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        status=(snapshot.child("Status").val())
        if(status!=="Need Age"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        appRef.child("Age").set(age)
        appRef.child("Status").set("Need Playtime")
        sender.send("The next item we will need to know is how much play time you have on your account\nYou can get this information by typing /age in game\nTo add this to your application type\"/applyplaytime|\"Your Playtime Here")
    })
}
module.exports.help = {
    name: "applyage"//Change to name of command
}