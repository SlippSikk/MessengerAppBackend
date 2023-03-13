```javascript
let data = {
    
    // TODO: insert your data structure that contains 
    // users + channels here

    // User object:
    users: [
        {
            userId: 1,
            nameFirst: 'Rani',
            nameLast: 'Jiang',
            email: 'ranivorous@gmail.com',
            password: 'abc123',
            handleStr: 'ranivorous',
            isAdmin: false
        }
    ],
    

    // Channel object:
    channels: [
        {
            channelId: 6,
            ownerId: 3,
            adminIds : [2, 3],
            memberIds: [1, 2, 3, 6, 8],
            channelName: 'General',
            isPublic: true,
            messages: [{
                messageID: 342, 
                senderId: 234, 
                responseId: [8442, 65, 764],
                time: "10:47",
                content: "Hi my name is Chris",
                reacts: {},
            }],
        }
    ],

}
```

[Optional] short description: 