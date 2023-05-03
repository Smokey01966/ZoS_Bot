module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}  
    reqArgs =memberFieldsConfig.data.numberOfRestrictedEditFields+1
    if(args.length !== reqArgs){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}nodisaddmember|(Gw2Account)|(${memberFieldsConfig.data.restrictedEditFields.join(")|(")})`);return;}
    if(message.channel.type==="dm"){sender.send("This command can not be done as a whisper and should be done in the bot command channel on the server");return;} 
    //gw2Account
    let gw2AccountIn = args[0].toLowerCase();
    if(gw2AccountIn === ""){ sender.send("The member's Gw2 Account must be included"); return;};
    gw2AccountPat= new RegExp("^.*(\\.\\d\\d\\d\\d)$")
    if(common.methods.isValidGw2Acct(gw2AccountIn)==="no"){{ sender.send(`The gw2account field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`); return;}}
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    //Rank
    rank = args[1];
    if(rank === ""){rank="Initiate"}else{if((ranksConfig.data.ranks.indexOf(rank)) === -1){sender.send("That is not a valid rank");return;}};
    if(common.methods.isOfficerRank(rank)==="yes"){sender.send("That rank can not be assigned to a new member");return;}
    rankSetOn = moment().tz(timeZone).format().slice(0,10)
    //Birthday
    birthday =args[2]
    if(birthday === ""){birthday="Not given"};
    if(birthday !== "Not given"){
        birthdaycheck =`2000-${birthday}`
        if(common.methods.isValidDate(birthdaycheck)==="no"){sender.send(`The birthday field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`);return;}}
    //Date Joined
    dateJoined =args[3];
    if(dateJoined === ""){dateJoined=moment().tz(timeZone).format().slice(0,10)};
    if(common.methods.isValidDate(dateJoined)==="no"){sender.send(`The date joined field is not the correct format type ${botConfig.prefix}formattinghelp for help with formatting`);return;}
    var ref = firebase.database().ref("members")
    var memRef =ref.child(gw2Account)
    ref.once("value", function(snapshot){
        if (snapshot.hasChild(gw2Account)){gw2ActTest="yes";}else{gw2ActTest="no"}
    }).then( function(){ 
            memRef.set({
            "Discord Account": "none",
            "Discord ID": "none",
            "Rank": rank,
            "Rank Set On": rankSetOn,
            "Birthday": birthday,
            "Date Joined": dateJoined
            })
            lastArgNumber=3
            for(i=0; i<memberFieldsConfig.data.numberOfCustomFields; i++){
                lastArgNumber++
                if(args[lastArgNumber]===""){data="none"}else{data=args[lastArgNumber]}
                fieldRef = ref.child(`${gw2Account}/${memberFieldsConfig.data.customFields[i]}`)
                fieldRef.set(data)
            }
            common.methods.displayUserInfo(ref, gw2Account, sender)})
}
module.exports.help = {
    name: "nodisaddmember"//Change to name of command
}