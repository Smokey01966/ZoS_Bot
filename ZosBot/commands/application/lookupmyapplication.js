module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}lookupmyapplication`);return;}//set number
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Could not find your application to start an application type /apply");return;}
        common.methods.displayApplication(ref, discordID, sender, message)
    })
}
module.exports.help = {
    name: "lookupmyapplication"//Change to name of command
}