```javascript
let data = {
    
    // TODO: insert your data structure that contains 
    // users + channels here

    // User object:
    userMembers: [
        {
            userID: 1,
            firstName: 'Rani',
            lastName: 'Jiang',
            email: 'ranivorous@gmail.com',
            password: 'abc123',
            handleStr: 'ranivorous',
            isAdmin: false
        }
    ],
    

    // Channel object:
    channelDetails: [
        {
            channelID: 6,
            ownerID: 3,
            adminIDs : [2, 3],
            memberIDs: [1, 2, 3, 6, 8],
            channelName: 'General',
            isPublic: true,
            messages: [{
                messageID: 342, 
                SenderID: 234, 
                ResponseID: [8442, 65, 764],
                Time: "10:47",
                Content: "Hi my name is Chris",
                reacts: {},
            },],
        }
    ],

}
```

[Optional] short description: 