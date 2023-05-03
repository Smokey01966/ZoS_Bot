module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 3){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editmember|(Gw2Account)|(Field)|(Data)`);return;}
    let gw2AccountIn = args[0].toLowerCase();
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    let field = args[1]
    let data = args[2]
    var ref = firebase.database().ref("members")
    var memRef = ref.child(gw2Account)
    var fieldRef = ref.child(`${gw2Account}/${field}`)
    var dateRankRef =ref.child(`${gw2Account}/Rank Set On`)
    memRef.once("value")
    .then(function(snapshot) {
        existsTest = snapshot.val() !== null
    }).then(function(){
        if(!existsTest){sender.send("This member does not exist");return;}
        if((memberFieldsConfig.data.restrictedEditFields.indexOf(field)) === -1){sender.send("That is not a valid field");return;}
        if(field==="Birthday"){
            if(data === ""){data="Not given"};
            if(data !== "Not given"){
                birthdaycheck =`2000-${data}`
                if(common.methods.isValidDate(birthdaycheck)==="no"){sender.send(`The birthday field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`);return;}}
        }
        if(field==="Date Joined"){
            if(data === ""){data=moment().tz(timeZone).format().slice(0,10)};
            if(common.methods.isValidDate(data)==="no"){sender.send(`The date joined field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`);return;}
        }
        if(field==="Rank"){
            if(common.methods.elevatedOfficerCheck(message)==="no"){
                memRef.once("value", function(snapshot){
                    targetRank =(snapshot.child("Rank").val())
                    if(common.methods.isOfficerRank(targetRank)==="yes"){sender.send("You do not have permission to edit this member's rank"); return;}
                    if(common.methods.isOfficerRank(data)==="yes"){sender.send("You do not have permission to assign officer ranks");return;}
                    if(data === ""){data="Initiate"}else{if((ranksConfig.data.ranks.indexOf(data)) === -1){sender.send("That is not a valid rank");return;}};
                    rankSetOn = moment().tz(timeZone).format().slice(0,10)
                    fieldRef.set(data)
                    dateRankRef.set(rankSetOn)
                    sender.send("Member Updated")
                    common.methods.displayUserInfo(ref, gw2Account, sender) 
                });return;
            }
            if(data === ""){data="Initiate"}else{if((ranksConfig.data.ranks.indexOf(data)) === -1){sender.send("That is not a valid rank");return;}};
            rankSetOn = moment().tz(timeZone).format().slice(0,10)
            fieldRef.set(data)
            dateRankRef.set(rankSetOn)
            sender.send("Member Updated")
            common.methods.displayUserInfo(ref, gw2Account, sender)  
        }
        if(data===""){data="none"}
        fieldRef.set(data)
        sender.sendMessage("Member Updated")
        common.methods.displayUserInfo(ref, gw2Account, sender)
    })
}
module.exports.help = {
    name: "editmember"//Change to name of command
}