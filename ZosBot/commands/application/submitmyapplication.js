module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send("Incorrect number of arguments for this command");return;}//set number
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        status=(snapshot.child("Status").val())
        if(status==="Pending Submission"){statusTest="yes"}else{
            if(status==="Pending"){statusTest="yes"}else{statusTest="no"}}
        if(statusTest==="no"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        appRef.child("Status").set("Submitted")
        sender.send("Your application has been submitted. An officer will review it and contact you")
    })
}
module.exports.help = {
    name: "submitmyapplication"//Change to name of command
}