module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}pendapplication|(Gw2 Account)|(Reason[note reason will be sent to applicant])`);return;}//set number
    let ref=firebase.database().ref("applications")
    let gw2Account=args[0].toLowerCase()
    let reason=args[1]
    if(reason.length > 900){sender.send("Application entries can only be 900 characters long");return;}
    ref.orderByChild("Gw2 Account").equalTo(gw2Account).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            discordID = data.key
            appRef=ref.child(discordID)
            status=(data.child("Status").val())
            if(status!=="Submitted"){sender.send("This application is not in a status to be pended");return;}
            appRef.child("Status").set("Pending")
            appRef.child("Notes").set(reason)
            bot.fetchUser(discordID).then((user)=>{
                user.send(`Your application has been set to pending because ${reason} \nplease type /editmyapplication|Field you wish to change|The new information to make the needed changes\n once this is done use the /submitmyapplication command to resubmit your application for review`)
            })
            sender.send("The application has been set to pending the the applicant as been notified")


            
        })
        }else{sender.send("Could not find an application from this user")}
    })
}
module.exports.help = {
    name: "pendapplication"//Change to name of command
}