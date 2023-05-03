module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}appealstrike|(Strike Number)`);return;}//set number
    let strikenumber = args[0]
    let discordAccount = `${sender.username}#${sender.discriminator}`
    var noteRef = firebase.database().ref("strikes")
    var dataRef = firebase.database().ref("members")
    var strikeRef = noteRef.child(strikenumber)
    let note = args [1]
    if(note.length > 900){sender.send("The note can only be 900 characters long");return;}
    dataRef.orderByChild("Discord Account").equalTo(discordAccount).once("value", function(snapshot){
        snapshot.forEach(function(data){
            senderGw2Account = data.key
        })
    }).then(function(){
        senderGw2AccountDis = `${senderGw2Account.slice(0,-4)}.${senderGw2Account.slice(-4)}`;
        newNote = `Appealed by (${senderGw2AccountDis} on ${moment().tz(timeZone).format().slice(0,10)}):\n${note}`
        noteRef.once("value", function(snapshot){
            if (snapshot.hasChild(strikenumber)){strikeTest="yes";}else{strikeTest="no"}
        }).then( function(){
            if(strikeTest==="no"){sender.send("Could not find that strike");return;}
            strikeRef.once("value", function(snapshot){
                if(common.methods.officerCheck(message) === "no"){
                    if(snapshot.child("Gw2 Account").val() !== senderGw2AccountDis){sender.send("This strike is not associated with your account"); return;}
                }
                if(snapshot.child("Status").val() !== "Entered"){sender.send("This strike is not eligible to be appealed");return;}
                currentNumberOfNotes = (snapshot.child("Number of Notes").val());
                let noteIndex = currentNumberOfNotes +1
                let newNumberOfNotes = currentNumberOfNotes +1
                var numberOfNotesRef = noteRef.child(`${strikenumber}/Number of Notes`)
                var noteNotesRef =noteRef.child(`${strikenumber}/Note ${noteIndex}`)
                var statusRef= noteRef.child(`${strikenumber}/Status`)
                var dateChangeRef= noteRef.child(`${strikenumber}/Date of Last Change`)
                numberOfNotesRef.set(newNumberOfNotes)
                noteNotesRef.set(newNote)
                statusRef.set("Appealed")
                dateChangeRef.set(moment().tz(timeZone).format().slice(0,10))
                sender.send("Strike Appealed")
            })
        })
    })         
}
module.exports.help = {
    name: "appealstrike"//Change to name of command
}