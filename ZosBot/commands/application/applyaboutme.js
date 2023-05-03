module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send("Incorrect number of arguments for this command");return;}//set number
    let aboutMe=args[0]
    if(aboutMe===""){sender.send("Opps looks like you forgot to include information about yourself");return;}
    if(aboutMe.length > 900){sender.send("Application entries can only be 900 characters long");return;}
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        status=(snapshot.child("Status").val())
        if(status!=="Need About Me"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        appRef.child("About Me").set(aboutMe)
        appRef.child("Status").set("Pending Submission")
        setTimeout(function(){sender.send("Here is your application")},500)
        setTimeout(function(){common.methods.displayApplication(ref, discordID, sender, message)},1000)
        setTimeout(function(){sender.send("The final step you need to take is to review and submit your application\nReview the application to make sure all the information is correct. You can then change any of the fields before submitting the application by using the /editmyapplication command\nAlso by submitting your application you are stating that you have read and agree to the ZoS guild rules and have a working microphone\nTo submit your application type\"/submitmyapplication\"")},1500)

    })
}
module.exports.help = {
    name: "applyaboutme"//Change to name of command
}