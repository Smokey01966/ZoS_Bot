module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}deletealtaccount|(Alt Gw2 Account)|(Alt Gw2 Account)`);return;}//set number
    altAccountIn=args[0].toLowerCase()
    verify=args[1].toLowerCase()
    if(altAccountIn!==verify){sender.send("The alt accounts did not match");return;}
    if(common.methods.isValidGw2Acct(altAccountIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
    altAccount=`${altAccountIn.slice(0,-5)}${altAccountIn.slice(-4)}`;
    ref = firebase.database().ref("alt accounts")
    ref.once("value", function(snapshot){
        if(snapshot.hasChild(altAccount)){altTest="yes"}else{altTest="no"}
    }).then(function(){
        if(altTest==="yes"){
            altRef=ref.child(altAccount)
            altRef.remove()
            sender.send("This alternate account has been removed")
        }else{
            sender.send("Could not find an entry of this alternate account")
        }
    })
}
module.exports.help = {
    name: "deletealtaccount"//Change to name of command
}