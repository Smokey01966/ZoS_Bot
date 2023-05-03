module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}superlookup|(Gw2 Account)`);return;}//set number
    let gw2AccountIn = args[0].toLowerCase();
    gw2AccountData=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    appRef=firebase.database().ref("applications")
    appRef.orderByChild("Gw2 Account").equalTo(gw2AccountIn).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            discordID = data.key
            common.methods.displayApplication(appRef, discordID, sender, message)})}else{sender.send("Could not find an application for this member")}
    }).then(function(){
        memRef=firebase.database().ref("members")
        actRef =memRef.child(gw2AccountData)
        memRef.once("value")
        .then(function(snapshot) {
        let existsTest = snapshot.val() !== null
        if(existsTest){
            common.methods.displayUserInfo(memRef, gw2AccountData, sender)
    }else{sender.send("Could not find a member entry for this member")}
    }).then(function(){
        memAltRef=firebase.database().ref("alt accounts")
        memAltRef.orderByChild("Main Account").equalTo(gw2AccountData).once("value", function(snapshot){
            existsTest=snapshot.val()
            if(existsTest){
                snapshot.forEach(function(data){
                    altAccount=data.key
                    altRef=memAltRef.child(altAccount)
                    altRef.once("value", function(alt){
                     altEmbed = new discord.RichEmbed()
                        .setTitle(`${alt.key.slice(0,-4)}.${alt.key.slice(-4)}`)
                        .setColor("#3d7d05")
                        .addField("Main Account", `${(alt.child("Main Account").val()).slice(0,-4)}.${(alt.child("Main Account").val()).slice(-4)}`)
                        sender.send(altEmbed)
             })
                })
            }else{
                sender.send("Could not find any alternative account information for this member")
             }
        })
    }).then(function(){
        var noteRef = firebase.database().ref("member notes")
        var memNoteRef = noteRef.child(gw2AccountData)
        noteRef.once("value", function(snapshot){
            if (snapshot.hasChild(gw2AccountData)){gw2ActTest="yes";}else{gw2ActTest="no"}
        }).then( function(){
        if(gw2ActTest==="no"){sender.send("Could not find any notes on that member");return;}
        common.methods.displayNotes(noteRef, memNoteRef, gw2AccountData, sender)
        })
    }).then(function(){
        strikeRef=firebase.database().ref("strikes")
        strikeRef.orderByChild("Gw2 Account").equalTo(gw2AccountIn).once("value", function(snapshot){
            existsTest =snapshot.val()
            if(existsTest){
            snapshot.forEach(function(data){
                strikenumber = data.key
                common.methods.displayStrike(strikeRef, strikenumber, sender)})}else{sender.send("Could not find any strikes for this member")}  
            })
    })
    })
}
module.exports.help = {
    name: "superlookup"//Change to name of command
}