module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupmystrikes`);return;}//set number
    var noteRef = firebase.database().ref("strikes")
    var dataRef = firebase.database().ref("members")
    let discordAccount = `${sender.username}#${sender.discriminator}`
    dataRef.orderByChild("Discord Account").equalTo(discordAccount).once("value", function(snapshot){
        snapshot.forEach(function(data){
            gw2Accountdata = data.key
            gw2Account = `${gw2Accountdata.slice(0,-4)}.${gw2Accountdata.slice(-4)}`
        })
    }).then(function(){
        noteRef.orderByChild("Gw2 Account").equalTo(gw2Account).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
            snapshot.forEach(function(data){
                strikenumber = data.key
                common.methods.displayStrike(noteRef, strikenumber, sender)})}else{sender.send("Could not find a match")}  
            })
    })
}
module.exports.help = {
    name: "lookupmystrikes"//Change to name of command
}