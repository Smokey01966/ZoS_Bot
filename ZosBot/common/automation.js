var methods ={};
var data ={};
methods.displayBirthdays = function(chan){
    memGw2AccountArray= [];
    let day = moment().tz(timeZone).format().slice(5,10)
    ref = firebase.database().ref("members")
    i=0
    ref.orderByChild("Birthday").equalTo(day).once("value", function(snapshot){
        existsTest = snapshot.val()
        if(existsTest){
            snapshot.forEach(function(data){
                memGw2Account= data.key
                memGw2AccountArray.push(`${memGw2Account.slice(0,-4)}.${memGw2Account.slice(-4)}`)
            })
        }else{
        memGw2AccountArray.push("no members have birthdays today")
        }
    }).then(function(){
        let zealotsInWeekEmbed= new discord.RichEmbed()
        .setTitle("Birthdays")
        .setColor("#3d7d05")
        .addField("These Members Have Birthdays Today", memGw2AccountArray.join(" "));
        channel =bot.channels.find("name", chan)
        channel.send(zealotsInWeekEmbed)
    })
}
methods.displayGuildMessage = function(chan){
    var weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday"
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
    day = weekday[moment().tz(timeZone).day()];
    ref=firebase.database().ref("guildmessages")
    ref.once("value", function(snapshot){
        let guildMessageEmbed = new discord.RichEmbed()
        .setTitle(`Guild Message`)
        .setColor("#3d7d05")
        .addField("Guild Message Header", (snapshot.child("Header").val()))
        .addField(`${day}:`, (snapshot.child(day).val()))
        channel =bot.channels.find("name", chan)
        channel.send(guildMessageEmbed);
})
}
methods.displayEvents =function(chan){
    let date = moment().tz(timeZone).format().slice(0,10)
    ref = firebase.database().ref("events")
    channel =bot.channels.find("name", chan)
    channel.send("Todays Events")
    .then(function(){ref.orderByChild("Event Date").equalTo(date).once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
            snapshot.forEach(function(data){
                eventNumber = data.key
                var eventRef =ref.child(eventNumber)
                eventRef.once("value", function(snapshot){
                    let eventEmbed = new discord.RichEmbed()
                    .setTitle(`Event Number: ${eventNumber}`)
                    .setColor("#3d7d05")
                    .addField("Date", (snapshot.child("Event Date").val()))
                    .addField("Event Details", (snapshot.child("Event Details").val()))
                     channel.send(eventEmbed);
                })
            })
        }else{channel.send("No events today")}  
    })
    })
}
methods.refreshMembers = function(){
    ref = firebase.database().ref("members")
    ref.orderByChild("Rank").once("value", function(snapshot){
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
                if(!target){console.log(`error with refresh of ${data.key}`);return;}
                rrole =target.user._roles
                target.setRoles([trole])
            })
        })
    })
}
methods.displayZealotsInWeek = function(chan){
    channel =bot.channels.find("name", chan)
    rankTest = 0
    memGw2AccountArray =[]
    ref = firebase.database().ref("members")
    ref.orderByChild("Rank").equalTo("Initiate").once("value", function(snapshot){
        existsTest =snapshot.val()
        if(existsTest){
            snapshot.forEach(function(data){
            rankDate=moment(data.child("Rank Set On").val()).format()
            if((moment(data.child("Rank Set On").val()).add(1, "months").subtract(1, "weeks")).isSameOrBefore(moment().tz(timeZone))){
                rankTest = 1
                memGw2Account= data.key
                memGw2AccountArray.push(`${memGw2Account.slice(0,-4)}.${memGw2Account.slice(-4)} eligable for promotion on ${(moment(data.child("Rank Set On").val())).add(1, "months").format().slice(5,10)}`)
            }
            })
        }
        let zealotsInWeekEmbed= new discord.RichEmbed()
        .setTitle("Soon to Be Zealots")
        .setColor("#3d7d05");
        if(rankTest=== 1){
            zealotsInWeekEmbed.addField("These Initiates are Eligible to be Zealots in a Week Or Less:", memGw2AccountArray.join("\n\n"));
        }else{
            zealotsInWeekEmbed.addField("These Initiates are Eligible to be Zealots in a Week Or Less", "No Initiates are eligible");
        }
        channel.send(zealotsInWeekEmbed)
    })
}
methods.displayStrikesYesterday = function(chan){
    channel =bot.channels.find("name", chan)
    rankTest = 0
    strikeArray =[]
    ref = firebase.database().ref("strikes")
    testDate=moment().tz(timeZone).subtract(1, "days").format().slice(0,10)
    ref.once("value", function(snapshot){
            snapshot.forEach(function(data){    
            strikeDate=data.child("Date of Strike").val()
            if(strikeDate===testDate){
                rankTest = 1
                strikeArray.push(`Strike number:  ${data.key} \nAgainst:  ${data.child("Gw2 Account").val()}\nType \n\"/lookupstrike||${data.key}\"\n to view more information about this strike`)}
            })
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Strikes Entered Yesterday")
            .setColor("#3d7d05");
            if(rankTest=== 1){
                strikesYesterdayEmbed.addField("These strikes where entered yesterday", strikeArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("These strikes where entered yesterday", "No strikes where entered yesterday");
            }
            channel.send(strikesYesterdayEmbed)
        })
}
methods.displayStrikesAppealed = function(chan){
    channel =bot.channels.find("name", chan)
    strikeTest = 0
    strikeArray =[]
    ref = firebase.database().ref("strikes")
    ref.orderByChild("Status").equalTo("Appealed").once("value", function(snapshot){
            snapshot.forEach(function(data){   
                strikeTest = 1
                strikeArray.push(`Strike number:  ${data.key} Against:  ${data.child("Gw2 Account").val()}\nType \n\"/lookupstrike||${data.key}\"\n to view more information about this strike`)
            })
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Appealed Strikes")
            .setColor("#3d7d05");
            if(strikeTest=== 1){
                strikesYesterdayEmbed.addField("These strikes have the status of Appealed", strikeArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("These strikes have the status of Appealed", "No strikes have the status of Appealed");
            }
            channel.send(strikesYesterdayEmbed)
        })
}
methods.displayApplicationsSubmitted = function(chan){
    channel =bot.channels.find("name", chan)
    appTest = 0
    appArray =[]
    ref = firebase.database().ref("applications")
    ref.orderByChild("Status").equalTo("Submitted").once("value", function(snapshot){
            snapshot.forEach(function(data){   
                appTest = 1
                appArray.push(`${data.child("Gw2 Account").val()}\nTo view the detals of this application type\n\"/lookupapplication|Gw2 Account|${data.child("Gw2 Account").val()}\"`)
            })
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Submitted Applications")
            .setColor("#3d7d05");
            if(appTest=== 1){
                strikesYesterdayEmbed.addField("Applications from these users have been submitted", appArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("Applications from these users have been submitted", "No applications have the status of submitted");
            }
            channel.send(strikesYesterdayEmbed)
        })
}
methods.closePolls = function(){
    ref = firebase.database().ref("polls")
    ref.orderByChild("properties/Close Date").once("value", function(snapshot){
        snapshot.forEach(function(data){   
            if(moment(data.child("properties/Close Date").val()).isSameOrBefore(moment().tz(timeZone))){
                pollNumber = data.key
                pollRef=ref.child(pollNumber)
                pollRef.child("properties/Status").set("Closed")
            }
        })
    })
}
methods.memberPolls = function(chan){
    channel =bot.channels.find("name", chan)
    pollTest = 0
    pollArray =[]
    ref = firebase.database().ref("polls")
    ref.orderByChild("properties/Status").equalTo("Open").once("value", function(snapshot){
            snapshot.forEach(function(data){   
                pollNumber = data.key
                pollRef=ref.child(pollNumber)
                pollRank=data.child("properties/Rank Required to Vote").val()
                if(pollRank==="m"){
                pollTest = 1
                pollArray.push(`Poll number:  ${pollNumber}\nWith the question of:\n  ${data.child("properties/Question").val()}  \nType: \n\"/lookuppoll|${pollNumber}\" \nto view more information about this poll`)
            }})
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Open Polls")
            .setColor("#3d7d05");
            if(pollTest=== 1){
                strikesYesterdayEmbed.addField("These polls are open for voting", pollArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("These polls are open for voting", "No polls have the status of open");
            }
            channel.send(strikesYesterdayEmbed)
        })
}
methods.officerPolls = function(chan){
    channel =bot.channels.find("name", chan)
    pollTest = 0
    pollArray =[]
    ref = firebase.database().ref("polls")
    ref.orderByChild("properties/Status").equalTo("Open").once("value", function(snapshot){
            snapshot.forEach(function(data){   
                pollNumber = data.key
                pollRef=ref.child(pollNumber)
                pollRank=data.child("properties/Rank Required to Vote").val()
                if(pollRank==="o"){
                pollTest = 1
                pollArray.push(`Poll number:  ${pollNumber}\nWith the question of:\n  ${data.child("properties/Question").val()}  \nType: \n\"/lookuppoll|${pollNumber}\"\n to view more information about this poll`)
            }})
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Open Polls")
            .setColor("#3d7d05");
            if(pollTest=== 1){
                strikesYesterdayEmbed.addField("These polls are open for voting", pollArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("These polls are open for voting", "No polls have the status of open");
            }
            channel.send(strikesYesterdayEmbed)
        })
}
methods.elevatedOfficerPolls = function(chan){
    channel =bot.channels.find("name", chan)
    pollTest = 0
    pollArray =[]
    ref = firebase.database().ref("polls")
    ref.orderByChild("properties/Status").equalTo("Open").once("value", function(snapshot){
            snapshot.forEach(function(data){   
                pollNumber = data.key
                pollRef=ref.child(pollNumber)
                pollRank=data.child("properties/Rank Required to Vote").val()
                if(pollRank==="e"){
                pollTest = 1
                pollArray.push(`Poll number:  ${pollNumber}\nWith the question of:\n  ${data.child("properties/Question").val()}  \nType: \n\"/lookuppoll|${pollNumber}\"\n to view more information about this poll`)
            }})
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Open Polls")
            .setColor("#3d7d05");
            if(pollTest=== 1){
                strikesYesterdayEmbed.addField("These polls are open for voting", pollArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("These polls are open for voting", "No polls have the status of open");
            }
            channel.send(strikesYesterdayEmbed)
        })
}

methods.memberClosedPolls = function(chan){
    channel =bot.channels.find("name", chan)
    pollTest = 0
    pollArray =[]
    ref = firebase.database().ref("polls")
    ref.orderByChild("properties/Status").equalTo("Closed").once("value", function(snapshot){
            snapshot.forEach(function(data){   
                pollNumber = data.key
                pollRef=ref.child(pollNumber)
                pollRank=data.child("properties/Rank Required to Vote").val()
                if(pollRank==="m"){
                    if((moment(data.child("properties/Close Date").val())).isSameOrAfter(moment().tz(timeZone).subtract(1, "weeks"))){
                pollTest = 1
                pollArray.push(`Poll number: ${pollNumber}\n With the question of:\n  ${data.child("properties/Question").val()}\n      \nType: \n\"/lookuppoll|${pollNumber}\"\n to view more information about this poll`)}
            }})
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Closed Polls")
            .setColor("#3d7d05");
            if(pollTest=== 1){
                strikesYesterdayEmbed.addField("These polls closed within a week ago", pollArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("These polls closed within a week ago", "No polls have closed within a week ago");
            }
            channel.send(strikesYesterdayEmbed)
        })
}

methods.officerClosedPolls = function(chan){
    channel =bot.channels.find("name", chan)
    pollTest = 0
    pollArray =[]
    ref = firebase.database().ref("polls")
    ref.orderByChild("properties/Status").equalTo("Closed").once("value", function(snapshot){
            snapshot.forEach(function(data){   
                pollNumber = data.key
                pollRef=ref.child(pollNumber)
                pollRank=data.child("properties/Rank Required to Vote").val()
                if(pollRank==="o"){
                    if((moment(data.child("properties/Close Date").val())).isSameOrAfter(moment().tz(timeZone).subtract(1, "weeks"))){
                        pollTest = 1
                pollArray.push(`Poll number:  ${pollNumber}\nWith the question of:\n  ${data.child("properties/Question").val()}  \nType: \n\"/lookuppoll|${pollNumber}\"\n to view more information about this poll`)}
            }})
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Closed Polls")
            .setColor("#3d7d05");
            if(pollTest=== 1){
                strikesYesterdayEmbed.addField("These polls closed within a week ago", pollArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("These polls closed within a week ago", "No polls have closed within a week ago");
            }
            channel.send(strikesYesterdayEmbed)
        })
}

methods.elevatedOfficerClosedPolls = function(chan){
    channel =bot.channels.find("name", chan)
    pollTest = 0
    pollArray =[]
    ref = firebase.database().ref("polls")
    ref.orderByChild("properties/Status").equalTo("Closed").once("value", function(snapshot){
            snapshot.forEach(function(data){   
                pollNumber = data.key
                pollRef=ref.child(pollNumber)
                pollRank=data.child("properties/Rank Required to Vote").val()
                if(pollRank==="e"){
                    if((moment(data.child("properties/Close Date").val())).isSameOrAfter(moment().tz(timeZone).subtract(1, "weeks"))){
                        pollTest = 1
                pollArray.push(`Poll number:  ${pollNumber}\nWith the question of:\n  ${data.child("properties/Question").val()}  \nType: \n\"/lookuppoll|${pollNumber}\"\n to view more information about this poll`)}
            }})
        }).then(function(){
            let strikesYesterdayEmbed= new discord.RichEmbed()
            .setTitle("Closed Polls")
            .setColor("#3d7d05");
            if(pollTest=== 1){
                strikesYesterdayEmbed.addField("These polls closed within a week ago", pollArray.join("\n\n"));
            }else{
                strikesYesterdayEmbed.addField("These polls closed within a week ago", "No polls have closed within a week ago");
            }
            channel.send(strikesYesterdayEmbed)
        })
}

methods.autoClear = function(){
    for(i=0;i<autoClearConfig.data.numberOfAutoClear;i++){
        channel=bot.channels.find("name",autoClearConfig.data.autoClear[i])
        channel.fetchMessages().then(messages =>{
        channel.bulkDelete(messages)
    })
    }
}
exports.methods = methods;
exports.data = data;