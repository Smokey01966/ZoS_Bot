module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupmembernotes|(Gw2 Account)`);return;}//set number
    //gw2Account
    let gw2AccountIn = args[0].toLowerCase();
    if(gw2AccountIn === ""){ sender.send("The member's Gw2 Account must be included"); return;};
    gw2AccountPat= new RegExp("^.*(\\.\\d\\d\\d\\d)$")
    if(common.methods.isValidGw2Acct(gw2AccountIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    var dataRef = firebase.database().ref("members")
    var noteRef = firebase.database().ref("member notes")
    var memNoteRef = noteRef.child(gw2Account)
    noteRef.once("value", function(snapshot){
        if (snapshot.hasChild(gw2Account)){gw2ActTest="yes";}else{gw2ActTest="no"}
    }).then( function(){
        if(gw2ActTest==="no"){sender.send("Could not find any notes on that member");return;}
        common.methods.displayNotes(dataRef, memNoteRef, gw2Account, sender)
    })
}
module.exports.help = {
    name: "lookupmembernotes"//Change to name of command
}