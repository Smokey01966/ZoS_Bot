module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}deletemember|(Gw2Account)|(Gw2Account)`);return;}
    let gw2AccountIn = args[0].toLowerCase();
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    let verifyIn = args[1].toLowerCase()
    verify=`${verifyIn.slice(0,-5)}${verifyIn.slice(-4)}`;
    let ref = firebase.database().ref("members")
    var memRef =ref.child(gw2Account)
    if(gw2Account !== verify){sender.send("The Gw2 account names did not match"); return;}
    memRef.once("value")
            .then(function(snapshot) {
            let existsTest = snapshot.val() !== null
            if(existsTest){
                common.methods.displayUserInfo(ref, gw2Account, sender); 
                setTimeout(function(){
                memRef.remove()
                sender.send("This entry has been deleted")}, 500);
            } else{
                sender.send("That Member does not exist")
            }
        });
}
module.exports.help = {
    name: "deletemember"//Change to name of command
}