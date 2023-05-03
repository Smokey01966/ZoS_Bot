//CODE STUFF BELOW DO NOT TOUCH
var methods ={};
var data ={};
data.requieredFields=[
    "Discord Account",
    "Discord ID",
    "Rank",
    "Rank Set On",
    "Birthday",
    "Date Joined"
]
data.requieredRestrictedEditFields=[
    "Rank",
    "Birthday",
    "Date Joined"
]
data.requieredEditFields=[
    "Birthday"
]
data.requieredFormatting=[
    "Discord Account (username#discriminator)",
    `Rank must be\n    ${ranksConfig.data.ranks.join("\n    ")} `,
    "Birthday (can be blank or mm-dd) If left blank defaults to Not Given",
    "Date Joined(can be blank or yyy-mmm-dd) If left blank defaults to the current date"
]
//CODE STUFF ABOVE DO NOT TOUCH
data.customFields=[
    //list the fields for the member database Gw2 Account is a field by default and does not need to be included
    //"Example format",
    //"Example format for last item"
    "Facebook Account",
    "Nickname"
]
data.customRestrictedEditFields=[
    //list the fields that can be edited by the edit member command must match the items in the custom fields setting above 
    //"Example format",
    //"Example format for last item"
    "Facebook Account",
    "Nickname"
]
data.customEditFields=[
        //list the fields that can be edited by the edit myself command must match the items in the custom fields setting above 
        //"Example format",
        //"Example format for last item"
        "Facebook Account",
        "Nickname"
]
data.customFormatting=[
    //list how certain fields must be formatted 
    //"Example format",
    //"Example format for last item"
    "Facebook Account (format none)",
    "Nickname (format none)"
]
//CODE STUFF BELOW DO NOT TOUCH
data.fields=data.requieredFields.concat(data.customFields)
data.restrictedEditFields=data.requieredRestrictedEditFields.concat(data.customRestrictedEditFields)
data.editFields=data.requieredEditFields.concat(data.customEditFields)
data.formatting=data.requieredFormatting.concat(data.customFormatting)
methods.validate =function(){
    let check = 1
    data.numberOfFields=data.fields.length
    data.numberOfRestrictedEditFields=data.restrictedEditFields.length
    data.numberOfEditFields=data.editFields.length
    data.numberOfCustomFields=data.customFields.length
    data.numberOfCustomRestrictedEditFields=data.customRestrictedEditFields.length
    data.numberOfCustomEditFields=data.customEditFields.length
    data.numberOfRequieredFields=data.requieredFields.length
    data.numberOfRequieredRestrictedEditFields=data.requieredRestrictedEditFields.length
    data.numberOfRequieredEditFields=data.requieredEditFields.length
    for(i=0; i<data.numberOfRestrictedEditFields; i++){
        if((data.fields.indexOf(data.restrictedEditFields[i])) === -1){check=0; console.log(`Bad custom restricted edit field ${data.restrictedEditFields[i]} does not match one of the specified fields check configs/memberFields.js`)}
    }
    for(i=0; i<data.numberOfEditFields; i++){
        if((data.fields.indexOf(data.editFields[i])) === -1){check=0; console.log(`Bad custom edit field ${data.editFields[i]} does not match one of the specified ranks check configs/memberFields.js`)}
    }
    return(check);
}

exports.methods = methods;
exports.data = data;
//CODE STUFF ABOVE DO NOT TOUCH