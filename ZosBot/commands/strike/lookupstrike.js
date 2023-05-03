module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupstrike|(Field[if left blank defaults to Strike Number]|(Data)`);return;}//set number
    let field = args[0]
    let dataIn = args[1]
    if(field==="Gw2 Account"){
        if(common.methods.isValidGw2Acct(dataIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
        data=dataIn.toLowerCase()
    }else{data=dataIn}
    var noteRef = firebase.database().ref("strikes")
    if (field===""){
        strikenumber=data
        noteRef.once("value", function(snapshot){
            if (snapshot.hasChild(strikenumber)){strikeTest="yes";}else{strikeTest="no"}
        }).then( function(){ 
            if(strikeTest==="yes"){
                common.methods.displayStrike(noteRef, strikenumber, sender)
                common.methods.displayStrikeNotes(noteRef, strikenumber, sender)
            }else{sender.send("Could not find a match")}
        })
     }else{
        if((strikeFieldsConfig.data.fields.indexOf(field)) === -1){sender.send("That is not a valid field");return;}
        noteRef.orderByChild(field).equalTo(data).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            strikenumber = data.key
            common.methods.displayStrike(noteRef, strikenumber, sender)})}else{sender.send("Could not find a match")}  
        })
    }  
}
module.exports.help = {
    name: "lookupstrike"//Change to name of command
}