module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}approveapplication|(Gw2 Account)`);return;}//set number
    let ref=firebase.database().ref("applications")
    let gw2Account=args[0].toLowerCase()
    ref.orderByChild("Gw2 Account").equalTo(gw2Account).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            discordID = data.key
            appRef=ref.child(discordID)
            status=(data.child("Status").val())
            if(status!=="Submitted"){sender.send("This application is not in a status to be approved");return;}
            appRef.child("Status").set("Approved")
            appRef.child("Notes").set(`Approved on ${moment().tz(timeZone).format().slice(0,10)}`)
            bot.fetchUser(discordID).then((user)=>{
                user.send(`Your application has been approved \nplease contact a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")} to set up your interview`)
            })
            sender.send("The application has been approved the the applicant as been notified to contact an officer for an interview")


            
        })
        }else{sender.send("Could not find an application from this user")}
    })
}
module.exports.help = {
    name: "approveapplication"//Change to name of command
}