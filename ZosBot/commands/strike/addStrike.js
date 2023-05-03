module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}addstrike|(Gw2 Account)|(Reason[include a URL to photos])`);return;}//set number
    //gw2Account
    let gw2AccountIn = args[0].toLowerCase();
    if(gw2AccountIn === ""){ sender.send("The member's Gw2 Account must be included"); return;};
    gw2AccountPat= new RegExp("^.*(\\.\\d\\d\\d\\d)$")
    if(common.methods.isValidGw2Acct(gw2AccountIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    //note
    var dataRef = firebase.database().ref("members")
    var noteRef = firebase.database().ref("strikes")
    let discordAccount = `${sender.username}#${sender.discriminator}`
    let note = args [1]
    if(note.length > 900){sender.send("The note can only be 900 characters long");return;}
    dataRef.orderByChild("Discord Account").equalTo(discordAccount).once("value", function(snapshot){
        snapshot.forEach(function(data){
            senderGw2Account = data.key
        })
    })
    altRef=firebase.database().ref(`alt accounts/${gw2Account}`)
    altRef.once("value",function(snapshot){
        if(snapshot.val()){
            mainAccount=`${snapshot.child("Main Account").val().slice(0,-4)}.${snapshot.child("Main Account").val().slice(-4)}`
            account=mainAccount
            altDisplay=`Issued against alt account ${gw2AccountIn}\n`
        }else{
            account=gw2AccountIn
            altDisplay=``
        }
    }).then(function(){
        senderGw2AccountDis = `${senderGw2Account.slice(0,-4)}.${senderGw2Account.slice(-4)}`;
        newNote = `${altDisplay}Initial entry (${senderGw2AccountDis} on ${moment().tz(timeZone).format().slice(0,10)}):\n${note}`
        }).then( function(){
            noteRef.push({
                "Gw2 Account": account,
                "Status": "Entered",
                "Date of Strike": moment().tz(timeZone).format().slice(0,10),
                "Date of Last Change": moment().tz(timeZone).format().slice(0,10),
                "Note 1": newNote,
                "Number of Notes": 1
            }).then(function(){
                noteRef.orderByChild("Gw2 Account").equalTo(account).once("value", function(snapshot){
                    existsTest =snapshot.val()
                    if(existsTest){
                    snapshot.forEach(function(data){
                        strikeNumber = data.key
                        var memNoteRef =noteRef.child(strikeNumber)
                        memNoteRef.once("value", function(snapshot){    
                            if(snapshot.child("Date of Strike").val() === moment().tz(timeZone).format().slice(0,10)){
                                
                                common.methods.displayStrike(noteRef, strikeNumber, sender)}})
                            })
                    }else{sender.send("Could not find a match")}})  
            })
        })
}
module.exports.help = {
    name: "addstrike"//Change to name of command
}