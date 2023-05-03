module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send("Incorrect number of arguments for this command please try again");return;}//set number
    let gw2Account=args[0].toLowerCase()
    let memGw2Account=`${gw2Account.slice(0,-5)}${gw2Account.slice(-4)}`
    let discordID= sender.id
    let ref=firebase.database().ref("applications")
    let memRef=firebase.database().ref("members")
    if(gw2Account === ""){ sender.send("Opps looks like you forgot to include your Gw2 account please try again"); return;};
    if(common.methods.isValidGw2Acct(gw2Account)==="no"){{ sender.send("Opps looks like you did not type your Gw2 account in the correct format make sure to include the .####"); return;}}
    ref.orderByChild("Gw2 Account").equalTo(gw2Account).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){gw2AccountTest="yes"}else{gw2AccountTest="No"}
    }).then(function(){
        if(gw2AccountTest==="yes"){sender.send("It looks like this Gw2 Account is already associated with another application");return;}
        memRef.once("value", function(snapshot){
            if(snapshot.hasChild(memGw2Account)){memgw2AccountTest="yes";}else{memgw2AccountTest="no"}
        }).then(function(){
            if(memgw2AccountTest==="yes"){sender.send("It looks like a there is already a member of the guild with this Gw2 account");return;}
            let appRef=ref.child(discordID)
            appRef.once("value", function(snapshot){
                let existsTest = snapshot.val() !== null
                if(!existsTest){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
                status=(snapshot.child("Status").val())
                if(status!=="Need Gw2 Account"){sender.send("Looks like you stumbled onto this command at the wrong time, to start an application type /apply");return;}
                appRef.child("Gw2 Account").set(gw2Account)
                appRef.child("Status").set("Need Age")
                sender.send("The next item we will need to know is your age\nTo add this to your application type\"/applyage|\"Your Age Here")
            })
        })
    })

}
module.exports.help = {
    name: "applygw2account"//Change to name of command
}