var methods ={};
var data ={};
methods.elevatedOfficerCheck = function(message){
    server=bot.guilds.find("name", servername)
    disID=message.author
    serverMember=server.member(disID)
    for(i=0; i<ranksConfig.data.numberOfElevatedOfficerRanks; i++){
        if(serverMember.roles.find("name", ranksConfig.data.elevatedOfficerRanks[i])){return("yes");}
    }
    return("no");
};

methods.officerCheck = function(message){
    server=bot.guilds.find("name", servername)
    disID=message.author
    serverMember=server.member(disID)
    for(i=0; i<ranksConfig.data.numberOfElevatedOfficerRanks; i++){
        if(serverMember.roles.find("name", ranksConfig.data.elevatedOfficerRanks[i])){return("yes");}
    }
    for(i=0; i<ranksConfig.data.numberOfOfficerRanks; i++){
        if(serverMember.roles.find("name", ranksConfig.data.officerRanks[i])){return("yes");}
    }
    return("no");
};
methods.memberCheck = function(message){
    server=bot.guilds.find("name", servername)
    disID=message.author
    serverMember=server.member(disID)
    for(i=0; i<ranksConfig.data.numberOfElevatedOfficerRanks; i++){
        if(serverMember.roles.find("name", ranksConfig.data.elevatedOfficerRanks[i])){return("yes");}
    }
    for(i=0; i<ranksConfig.data.numberOfOfficerRanks; i++){
        if(serverMember.roles.find("name", ranksConfig.data.officerRanks[i])){return("yes");}
    }
    for(i=0; i<ranksConfig.data.numberOfRanks; i++){
        if(serverMember.roles.find("name", ranksConfig.data.ranks[i])){return("yes");}
    }
    return("no");
};
methods.isElevatedOfficerRank = function(rank){
    for(i=0; i<ranksConfig.data.numberOfElevatedOfficerRanks; i++){
        if(rank===ranksConfig.data.elevatedOfficerRanks[i]){return("yes");}
    }
    return("no");
};

methods.isOfficerRank = function(rank){
    for(i=0; i<ranksConfig.data.numberOfElevatedOfficerRanks; i++){
        if(rank===ranksConfig.data.elevatedOfficerRanks[i]){return("yes");}
    }
    for(i=0; i<ranksConfig.data.numberOfOfficerRanks; i++){
        if(rank===ranksConfig.data.officerRanks[i]){return("yes");}
    }
    return("no");
};
methods.displayUserInfo = function(ref, gw2Account, sender) {
    var memRef =ref.child(gw2Account)
    memRef.once("value", function(snapshot){
                gw2AccountDis = `${gw2Account.slice(0,-4)}.${gw2Account.slice(-4)}`;
                discordAccount = (snapshot.child("Discord Account").val());
                discordID = (snapshot.child("Discord ID").val());
                rank =(snapshot.child("Rank").val());
                dateRankSet =(snapshot.child("Rank Set On").val());
                birthday =(snapshot.child("Birthday").val());
                dateJoin =(snapshot.child("Date Joined").val());
                let memberEmbed = new discord.RichEmbed()
                .setTitle(gw2AccountDis)
                .setColor("#3d7d05")
                .addField("Discord Account", `${discordAccount}`)
                .addField("Discord ID", `${discordID}`)
                .addField("Rank", `${rank}`)
                .addField("Rank Set On", `${dateRankSet}`)
                .addField("Birthday", `${birthday}`)
                .addField("Date Joined", `${dateJoin}`);
                for(i=0; i<memberFieldsConfig.data.numberOfCustomFields; i++){
                    field=`${memberFieldsConfig.data.customFields[i]}`
                    memberEmbed.addField(field, (snapshot.child(field).val()))
                }
        sender.send(memberEmbed);
        return;})
    }
methods.isValidDate = function(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return "no";  // Invalid format
    var d = new Date(dateString);
    if(!d.getTime() && d.getTime() !== 0) return "no"; // Invalid date
    return d.toISOString().slice(0,10) === dateString;
  }
methods.isValidGw2Acct =function(gw2AccountIn){
    gw2AccountPat= new RegExp("^.*(\\.\\d\\d\\d\\d)$")
    if(!gw2AccountPat.test(gw2AccountIn)){return"no";};
}
methods.refreshmembers = function(message){
    sender = message.author;
    ref = firebase.database().ref("members")
    ref.once("value", function(snapshot){
        snapshot.forEach(function(data){
            gw2Account = data.key
            memRef =ref.child(gw2Account)
            memRef.once("value", function(snapshot){
                if(snapshot.child("Discord ID").val()==="none"){return;}
                server=bot.guilds.find("name", servername)
                rank =(snapshot.child("Rank").val());
                trole = server.roles.find("name", rank)
                discordID = (snapshot.child("Discord ID").val());
                target= server.member(discordID)
                if(!target){sender.send(`ERROR:\nIssue with ${data.key} check their member database entry, there is either bad data or they have left the Discord sever.\nThis member was skipped\nContinuing with the member refresh`);return;}
                rrole =target.user._roles
                target.setRoles([trole])
            })
        })
    })
}
methods.displayNotes = function(dataRef, memNoteRef, gw2Account, sender){
    gw2AccountDis = `${gw2Account.slice(0,-4)}.${gw2Account.slice(-4)}`;
    dataRef.once("value", function(snapshot){
    if (snapshot.hasChild(gw2Account)){gw2ActTest="yes";}else{gw2ActTest="no"}
    }).then( function(){
        if(gw2ActTest==="no"){sender.send("Could not find that member");return;}
        memNoteRef.once("value", function(snapshot){
            numberOfNotes = (snapshot.child("Number of Notes").val())-1;
            numberOfMessages = Math.floor(numberOfNotes/25)+1
            for(m=0;m<numberOfMessages; m++){
                noteEmbed = new discord.RichEmbed()
                .setTitle(`Notes on ${gw2AccountDis} page ${m+1}`)
                .setColor("#3d7d05")
                startNoteIndex=1+m*25
                for(n=0; n<25; n++){
                    if(startNoteIndex+n>numberOfNotes+1){sender.send(noteEmbed);return;}else{
                    noteIndex=`Note ${startNoteIndex+n}`
                    noteEmbed.addField(noteIndex, (snapshot.child(noteIndex).val()))}
                }
                sender.send(noteEmbed)
            }
        })
    }) 
}
methods.displayStrike = function(noteRef, strikenumber, sender) {
    var memNoteRef =noteRef.child(strikenumber)
    memNoteRef.once("value", function(snapshot){
                let strikeEmbed = new discord.RichEmbed()
                .setTitle(`Strike Number: ${strikenumber}`)
                .setColor("#3d7d05")
                .addField("Gw2 Account", (snapshot.child("Gw2 Account").val()))
                .addField("Status", (snapshot.child("Status").val()))
                .addField("Date of Strike", (snapshot.child("Date of Strike").val()))
                .addField("Date of Last Change", (snapshot.child("Date of Last Change").val()))
                .addField("To view more details on this strike type", `/lookupstrike||${strikenumber}`)
                sender.send(strikeEmbed);
        })
}
methods.displayStrikeNotes = function(noteRef, strikenumber, sender){
    noteRef.once("value", function(snapshot){
    if (snapshot.hasChild(strikenumber)){strikeTest="yes";}else{strikeTest="no"}
    }).then( function(){
        if(strikeTest==="no"){sender.send("Could not find that strike");return;}
        strikeNoteRef=noteRef.child(strikenumber)
        strikeNoteRef.once("value", function(snapshot){
            numberOfNotes = (snapshot.child("Number of Notes").val())-1;
            numberOfMessages = Math.floor(numberOfNotes/25)+1
            for(m=0;m<numberOfMessages; m++){
                noteEmbed = new discord.RichEmbed()
                .setTitle(`Notes on strike number ${strikenumber} page ${m+1}`)
                .setColor("#3d7d05")
                startNoteIndex=1+m*25
                for(n=0; n<25; n++){
                    if(startNoteIndex+n>numberOfNotes+1){sender.send(noteEmbed);return;}else{
                    noteIndex=`Note ${startNoteIndex+n}`
                    noteEmbed.addField(noteIndex, (snapshot.child(noteIndex).val()))}
                }
                sender.send(noteEmbed)
            }
        })
    }) 
}
methods.displayEvent = function(ref, eventnumber, sender) {
    var eventRef =ref.child(eventnumber)
    eventRef.once("value", function(snapshot){
                let eventEmbed = new discord.RichEmbed()
                .setTitle(`Event Number: ${eventnumber}`)
                .setColor("#3d7d05")
                .addField("Date", (snapshot.child("Event Date").val()))
                .addField("Event Details", (snapshot.child("Event Details").val()))
                sender.send(eventEmbed)
        })
}
methods.displayGuildMessage = function(ref, day, sender) {
    ref.once("value", function(snapshot){
                let guildMessageEmbed = new discord.RichEmbed()
                .setTitle(`Guild Message`)
                .setColor("#3d7d05")
                .addField("Guild Message Header", (snapshot.child("Header").val()))
                .addField(`${day}:`, (snapshot.child(day).val()))
                sender.send(guildMessageEmbed);
        })
}

methods.duplicateCheck = function(a) {
    var counts = [];
    for(var i = 0; i <= a.length; i++) {
        if(counts[a[i]] === undefined) {
            counts[a[i]] = 1;
        } else {
            return "yes";
        }
    }
    return "no";
}

methods.displayPoll = function(ref, pollNumber, sender) {
    var pollRef =ref.child(pollNumber)
    pollRef.once("value", function(snapshot){
                rankRequiredToVote = (snapshot.child("properties/Rank Required to Vote").val());
                if(rankRequiredToVote==="m"){disRankReq="\"m\" Must be a guild member"}
                if(rankRequiredToVote==="o"){disRankReq=`\"o\" Must be a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")}`}
                if(rankRequiredToVote==="e"){disRankReq=`\"e"\ Must be a ${ranksConfig.data.elevatedOfficerRanks.join(" or ")}`}
                status = (snapshot.child("properties/Status").val());
                numberOfVotesPerPerson =(snapshot.child("properties/Number of Votes Per Person").val());
                closeDate =(snapshot.child("properties/Close Date").val());
                question =(snapshot.child("properties/Question").val());
                options =(snapshot.child("properties/Options").val());
                voteTallies=(snapshot.child("properties/Vote Tallies").val());
                optionsDis=options.split("|");
                numberOfOptions=optionsDis.length
                voteExample=[]
                        for(n=0;n<numberOfVotesPerPerson; n++){
                            voteExample.push(`Replace with option number`)
                        }
                let pollEmbed = new discord.RichEmbed()
                .setTitle(`Poll number: ${pollNumber}`)
                .setColor("#3d7d05")
                .addField("Rank Required to Vote", `${disRankReq}`)
                .addField("Status", `${status}`)
                .addField("Close Date", `${closeDate}`)
                .addField("Number of Votes Per Person", `${numberOfVotesPerPerson}`)
                .addField("Question", `${question}`)
                if(status==="Open"){
                pollEmbed.addField(`To vote in this poll type`, `\"/addvote|${pollNumber}|${voteExample.join("|")}\"`);
                }
                if(options===""){
                    pollEmbed
                    .addField("Options", "No options added yet")
                    sender.send(pollEmbed);
                }else{
                    sender.send(pollEmbed);
                    optionsDis=options.split("|")
                    if(status==="Closed"){
                        voteTalliesDis=voteTallies.split("|")
                    }
                    numberOfOptions=optionsDis.length
                    numberOfMessages = Math.floor(numberOfOptions/25)+1
                    for(m=0;m<numberOfMessages; m++){
                        noteEmbed = new discord.RichEmbed()
                        .setTitle(`Options for Poll Number ${pollNumber} page ${m+1}`)
                        .setColor("#3d7d05")
                        startOptionsIndex=1+m*25
                        for(n=0; n<25; n++){
                            if(startOptionsIndex+n>numberOfOptions){sender.send(noteEmbed);return;}else{
                                if(status==="Closed"){
                                    voteTalliesText=`\n Number of votes: ${voteTalliesDis[startOptionsIndex+n-1]}`
                                }else{voteTalliesText=""}
                                optionIndex=`Option ${startOptionsIndex+n}`
                                noteEmbed.addField(optionIndex, `${optionsDis[startOptionsIndex+n-1]} ${voteTalliesText}`)
                            }
                        }
                        sender.send(noteEmbed)
                    }     
                } 
    })
    }
    methods.displayApplication = function(ref, discordID, sender, message) {
        var appRef =ref.child(discordID)
        appRef.once("value", function(snapshot){
                    discordAccount = (snapshot.child("Discord Account").val());
                    gw2Account=(snapshot.child("Gw2 Account").val());
                    age=(snapshot.child("Age").val());
                    playtime=(snapshot.child("Play Time").val())
                    playstyle=(snapshot.child("Play Style").val());
                    pastguilds=(snapshot.child("Past Guilds").val());
                    reason=(snapshot.child("Reason for Applying").val());
                    aboutme=(snapshot.child("About Me").val());
                    status=(snapshot.child("Status").val());
                    notes=(snapshot.child("Notes").val());
                    if(notes===""){notes="No Notes"}
                    let appEmbed = new discord.RichEmbed()
                    .setTitle(`${gw2Account}'s application`)
                    .setColor("#3d7d05")
                    .addField("Gw2 Account", `${gw2Account}`)
                    .addField("Discord Account", `${discordAccount}`)
                    .addField("Age", `${age}`)
                    .addField("Play Time", `${playtime}`)
                    .addField("Play Style", `${playstyle}`)
                    .addField("Past Guilds", `${pastguilds}`)
                    .addField("Reason for Applying", `${reason}`)
                    .addField("About Me", `${aboutme}`)
                    .addField("Status", `${status}`)
                    .addField("Notes", `${notes}`);
                    if(common.methods.officerCheck(message) === "yes"){
                    appEmbed.addField("Application Commands", `${botConfig.prefix}deleteapplication, ${botConfig.prefix}pendapplication, ${botConfig.prefix}approveapplication, ${botConfig.prefix}invite`)
                    }
                    sender.send(appEmbed);
            })
        }

exports.methods = methods;
exports.data = data;
