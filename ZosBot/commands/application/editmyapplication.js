module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}editmyapplication|(Field)|(Data)`);return;}//set number
    let ref=firebase.database().ref("applications")
    let discordID= sender.id
    let appRef=ref.child(discordID)
    let field=args[0]
        fieldCheck=0
        if(field === "Gw2 Account"){fieldCheck=1}
        if(field === "Age"){fieldCheck=1}
        if(field === "Play Time"){fieldCheck=1}
        if(field === "Play Style"){fieldCheck=1}
        if(field === "Past Guilds"){fieldCheck=1}
        if(field === "Reason for Applying"){fieldCheck=1}
        if(field === "About Me"){fieldCheck=1}
        if(fieldCheck===0){sender.send("That is not a valid field");return;}
    let dataIn=args[1]
    if(field==="Gw2 Account"){
        if(dataIn===""){sender.send("Opps looks like you forgot to include your Gw2 Account");return;}
        if(common.methods.isValidGw2Acct(dataIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
        dataChop=`${dataIn.slice(0,-5)}${dataIn.slice(-4)}`
        data=dataChop.toLowerCase()
    }else{        
        if(dataIn===""){sender.send("Opps looks like you forgot to include the information");return;}
        if(dataIn.length > 900){sender.send("Application entries can only be 900 characters long");return;}
        data=dataIn
        }
    appRef.once("value", function(snapshot){
        let existsTest = snapshot.val() !== null
        if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
        status=(snapshot.child("Status").val())
        if(status==="Pending Submission"){statusTest="yes"}else{
            if(status==="Pending"){statusTest="yes"}else{statusTest="no"}}
        if(statusTest==="no"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}        
        appRef.child(field).set(data)
        sender.send("Your application has been updated")
        common.methods.displayApplication(ref, discordID, sender, message)
    })
}
module.exports.help = {
    name: "editmyapplication"//Change to name of command
}