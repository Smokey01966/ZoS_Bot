module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}addmembernote|(Gw2 Account)|(Note)`);return;}//set number
    //gw2Account
    let gw2AccountIn = args[0].toLowerCase();
    if(gw2AccountIn === ""){ sender.send("The member's Gw2 Account must be included"); return;};
    if(common.methods.isValidGw2Acct(gw2AccountIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    //note
    var dataRef = firebase.database().ref("members")
    var noteRef = firebase.database().ref("member notes")

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
            account=`${mainAccount.slice(0,-5)}${mainAccount.slice(-4)}`
            altDisplay=`Note on alt account ${gw2AccountIn}\n`
        }else{
            account=gw2Account
            altDisplay=``
        }
    }).then(function(){
        senderGw2AccountDis = `${senderGw2Account.slice(0,-4)}.${senderGw2Account.slice(-4)}`;
        newNote = `${altDisplay}Added by ${senderGw2AccountDis} on ${moment().tz(timeZone).format().slice(0,10)}:\n${note}`
        var memNoteRef = noteRef.child(account)
        dataRef.once("value", function(snapshot){
            if (snapshot.hasChild(account)){gw2ActTest="yes";}else{gw2ActTest="no"}
        }).then( function(){
            if(gw2ActTest==="no"){sender.send("Could not find that member");return;}
            memNoteRef.once("value", function(snapshot){
                currentNumberOfNotes = (snapshot.child("Number of Notes").val());
                if(currentNumberOfNotes){
                    let noteIndex = currentNumberOfNotes +1
                    let newNumberOfNotes = currentNumberOfNotes +1
                    var numberOfNotesRef = noteRef.child(`${account}/Number of Notes`)
                    var noteNotesRef =noteRef.child(`${account}/Note ${noteIndex}`)
                    numberOfNotesRef.set(newNumberOfNotes)
                    noteNotesRef.set(newNote)
                    sender.send("Note Added")
                }else{
                    let noteIndex = 1
                    let newNumberOfNotes = 1
                    var numberOfNotesRef = noteRef.child(`${account}/Number of Notes`)
                    var noteNotesRef =noteRef.child(`${account}/Note ${noteIndex}`)
                    numberOfNotesRef.set(newNumberOfNotes)
                    noteNotesRef.set(newNote)
                    sender.send("Note Added")
                }
            })
        })
    })
}
module.exports.help = {
    name: "addmembernote"//Change to name of command
}