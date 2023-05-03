module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}apply`);return;}//set number
    let discordAccount = `${sender.username}#${sender.discriminator}`
    let discordID= sender.id
    ref=firebase.database().ref("applications")
    memRef=firebase.database().ref("members")
    if(common.methods.memberCheck(message) === "yes"){sender.send("Looks like you are already a member");return;}
    ref.once("value", function(snapshot){
        if (snapshot.hasChild(discordID)){discordTest="yes";}else{discordTest="no"}
    }).then( function(){
        if(discordTest==="yes"){sender.send(`An applicaion has already been created by this discord account \n use /lookupmyapplicaion to view it \n if you belive this is in error contact a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")}`);return;}
        memRef.orderByChild("Discord ID").equalTo(discordID).once("value", function(snapshot){
            existTest= snapshot.val()
            if(existTest){discordTest="yes"}
        }).then(function(){
            if(discordTest==="yes"){sender.send(`A guild member is already associted with this discord account \n use /lookupmyself to view the member entry \n if you belive this is in error contact a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")}`);return;}
            appRef=ref.child(discordID)
            appRef.child("Discord Account").set(discordAccount)
            appRef.child("Status").set("Need Gw2 Account")
            appRef.child("Notes").set("")
            sender.send(`Thanks for starting an application to the ZOS guild. I will now guide you through the application process.\nIf you need help at any point feel free to contact a  ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")}\nThe next item we will need to know is your Guild Wars 2 account including the .####\nTo add this to your application type \"/applygw2account|\"Gw2 Account Name Here`)
        })
    })
}
module.exports.help = {
    name: "apply"//Change to name of command
}