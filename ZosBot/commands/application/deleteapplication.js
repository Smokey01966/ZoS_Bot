module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}deleteapplication|(Discord Account[including the #numbers])|(Discord Account[including the #numbers])`);return;}//set number
    let ref=firebase.database().ref("applications")
    let discordAccount=args[0]
    let verify=args[1]
    if(discordAccount!==verify){sender.send("The discord usernames did not match");return;}
    ref.orderByChild("Discord Account").equalTo(discordAccount).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            discordID = data.key
            common.methods.displayApplication(ref, discordID,sender, message)
            setTimeout(function(){
                appRef=ref.child(discordID)
                appRef.remove()
                sender.send("This application has been deleted")
            },500)
        })
        }else{sender.send("Could not find an application from this user")}
    })
}
module.exports.help = {
    name: "deleteapplication"//Change to name of command
}