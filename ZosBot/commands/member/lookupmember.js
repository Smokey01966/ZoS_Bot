module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupmember|(Field)|(Search)`);return;}//set number
    let info = args [0];
    let name = args[1];
    let gw2Account = "";
    let data ="";
    ref = firebase.database().ref("members")
    if(info !== ""){
        if((memberFieldsConfig.data.fields.indexOf(info)) === -1){sender.send("That is not a valid field");return;}
        ref.orderByChild(info).equalTo(name).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
        snapshot.forEach(function(data){
            gw2Account = data.key
            common.methods.displayUserInfo(ref, gw2Account, sender)})}else{sender.send("Could not find a match")}  
    })
    }else
    {
        gw2AccountIn = name.toLowerCase();
        gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
                var memRef =ref.child(gw2Account)
        memRef.once("value")
        .then(function(snapshot) {
        let existsTest = snapshot.val() !== null
        if(existsTest){
            common.methods.displayUserInfo(ref, gw2Account, sender)
    }else{sender.send("Could not find a match")}
    });  
        }
}
module.exports.help = {
    name: "lookupmember"//Change to name of command
}