module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupaltaccount|(Main or Alt Gw2 Account)`);return;}//set number
    accountIn=args[0].toLowerCase()
    if(common.methods.isValidGw2Acct(accountIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
    account=`${accountIn.slice(0,-5)}${accountIn.slice(-4)}`;
    ref=firebase.database().ref("alt accounts")
    ref.once("value", function(snapshot){
        if(snapshot.hasChild(account)){altTest="yes"}else{altTest="no"}
    }).then(function(){
        if(altTest==="yes"){
            altRef=ref.child(account)
            altRef.once("value", function(snapshot){
                altEmbed = new discord.RichEmbed()
                .setTitle(`${snapshot.key.slice(0,-4)}.${snapshot.key.slice(-4)}`)
                .setColor("#3d7d05")
                .addField("Main Account", `${(snapshot.child("Main Account").val()).slice(0,-4)}.${(snapshot.child("Main Account").val()).slice(-4)}`)
                sender.send(altEmbed)
            })
        }else{
       ref.orderByChild("Main Account").equalTo(account).once("value", function(snapshot){
           existsTest=snapshot.val()
           if(existsTest){
               snapshot.forEach(function(data){
                   altAccount=data.key
                   altRef=ref.child(altAccount)
                   altRef.once("value", function(alt){
                    altEmbed = new discord.RichEmbed()
                       .setTitle(`${alt.key.slice(0,-4)}.${alt.key.slice(-4)}`)
                       .setColor("#3d7d05")
                       .addField("Main Account", `${(alt.child("Main Account").val()).slice(0,-4)}.${(alt.child("Main Account").val()).slice(-4)}`)
                       sender.send(altEmbed)
            })
               })
           }else{
               sender.send("Could not find any alternative account information for that account")
            }
       })
    } 
    })
}
module.exports.help = {
    name: "lookupaltaccount"//Change to name of command
}