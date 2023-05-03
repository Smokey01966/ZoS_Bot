module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}addaltaccount|(Main Gw2 Account)|(Alt Gw2 Account)`);return;}//set number
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    //gw2 account
    gw2AccountIn=args[0].toLowerCase()
    if(common.methods.isValidGw2Acct(gw2AccountIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    //alt account
    altAccountIn=args[1].toLowerCase()
    if(common.methods.isValidGw2Acct(altAccountIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
    altAccount=`${altAccountIn.slice(0,-5)}${altAccountIn.slice(-4)}`;
    memRef = firebase.database().ref("members")
    ref = firebase.database().ref("alt accounts")
    memRef.once("value", function(snapshot){
        if (snapshot.hasChild(gw2Account)){gw2ActTest="yes";}else{gw2ActTest="no"}
        if (snapshot.hasChild(altAccount)){gw2AltTest="yes"}else{gw2AltTest="no"}
    })
    ref.once("value",function(snapshot){
            if (snapshot.hasChild(altAccount)){altAccountTest="yes"}else{altAccountTest="no"}
        }).then( function(){
        if(gw2ActTest==="no"){sender.send("Could not find that member");return;}
        if(gw2AltTest==="yes"){sender.send("The alt account entered is already in use as a main account");return;}
        if(altAccountTest==="yes"){sender.send("That alt account is already associated with a main account");return;}
        ref.child(altAccount).set({"Main Account": gw2Account})
        sender.send(`${altAccountIn} added as an alternate account for ${gw2AccountIn}`)
    })


}
module.exports.help = {
    name: "addaltaccount"//Change to name of command
}