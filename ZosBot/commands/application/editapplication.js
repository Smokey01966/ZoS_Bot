module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 3){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editapplication|(Gw2 Account)|(Field)|(Data)`);return;}//set number
    let ref=firebase.database().ref("applications")
    let gw2Account=args[0].toLowerCase()
    let field=args[1]
        feildCheck=0
        if(field === "Age"){feildCheck=1}
        if(field === "Gw2 Account"){feildCheck=1}
        if(field === "Play Time"){feildCheck=1}
        if(field === "Play Style"){feildCheck=1}
        if(field === "Past Guilds"){feildCheck=1}
        if(field === "Reason for Applying"){feildCheck=1}
        if(field === "About Me"){feildCheck=1}
        if(feildCheck===0){sender.send("That is not a valid field");return;}
    let dataIn=args[2]
    if(field==="Gw2 Account"){
        if(data===""){sender.send("Opps looks like you forgot to include the Gw2 Account");return;}
        if(common.methods.isValidGw2Acct(dataIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
        dataChop=`${dataIn.slice(0,-5)}${dataIn.slice(-4)}`
        data=dataChop.toLowerCase()
    }else{
        if(dataIn===""){sender.send("Opps looks like you forgot to include the information");return;}
        if(dataIn.length > 900){sender.send("Application entries can only be 900 characters long");return;}
        data=dataIn
    }
    ref.orderByChild("Gw2 Account").equalTo(gw2Account).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            discordID = data.key
            appRef=ref.child(discordID)
            status=(data.child("Status").val())
            if(status==="Submitted"){statusTest="yes"}else{
                if(status==="Pending"){statusTest="yes"}else{statusTest="no"}}
            if(statusTest==="no"){sender.send("This application is not in a status to be edited");return;}        
            appRef.child(field).set(data)
            })
            common.methods.displayApplication(ref, discordID, sender, message)
        }else{sender.send("Could not find an application from this user")}
    })
}
module.exports.help = {
    name: "editapplication"//Change to name of command
}