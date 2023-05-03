module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}invite|(Gw2 Account)`);return;}//set number
    let ref=firebase.database().ref("applications")
    let memRef=firebase.database().ref("members")
    let gw2Account=args[0].toLowerCase()
    ref.orderByChild("Gw2 Account").equalTo(gw2Account).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            discordID = data.key
            appRef=ref.child(discordID)
            status=(data.child("Status").val())
            if(status!=="Approved"){sender.send("This application is not in a status to be invited");return;}
            appRef.child("Status").set("Invited")
            appRef.child("Notes").set(`Invited on ${moment().tz(timeZone).format().slice(0,10)}`)
            discordAccount=(data.child("Discord Account").val())
            memGw2Account=`${gw2Account.slice(0,-5)}${gw2Account.slice(-4)}`
            var memDataRef =memRef.child(memGw2Account)
            memDataRef.set({
                "Discord Account": discordAccount,
                "Discord ID": discordID,
                "Rank": "Initiate",
                "Rank Set On": moment().tz(timeZone).format().slice(0,10),
                "Birthday": "Not Given",
                "Date Joined": moment().tz(timeZone).format().slice(0,10)
                })
                lastArgNumber=4
                for(i=0; i<memberFieldsConfig.data.numberOfCustomFields; i++){
                    lastArgNumber++
                    data="none"
                    fieldRef = memRef.child(`${memGw2Account}/${memberFieldsConfig.data.customFields[i]}`)
                    fieldRef.set(data)
                }
            sender.send("The application has been set to the invited status and a new member entry has been made for the applicant")
            
        })
        }else{sender.send("Could not find an application from this user")}
    })
}
module.exports.help = {
    name: "invite"//Change to name of command
}