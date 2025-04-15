
22030401014
kkhf8KXeigkOSzcp

ram_ahir
mqCfPtKbzQT3DZSK



/users (Collection)
  └─ {userId} (Document)
       ├─ username: "@johndoe"
       ├─ name: "John Doe"
       ├─ profileImg: "https://..."
       ├─ status: "online"

/chats (Collection)
  └─ {chatId} (Document)
       ├─ isGroup: true/false
       ├─ members: [userId1, userId2]
       ├─ createdAt
       ├─ lastMessage
       └─ messages (Subcollection)
            └─ {messageId}
                ├─ senderId
                ├─ text / image / voice
                ├─ createdAt
                ├─ seenBy: [userId]



1. users Collection
Each document stores a user:

{
  "_id": ObjectId("..."),
  "username": "@john_doe",
  "name": "John Doe",
  "profileImg": "https://i.pravatar.cc/150?img=1",
  "status": "online",
  "lastSeen": ISODate("2025-04-10T13:23:00Z")
}
2. chats Collection
Each document represents a one-on-one or group chat:

{
  "_id": ObjectId("..."),
  "isGroup": false,
  "members": [
    ObjectId("userId1"),
    ObjectId("userId2")
  ],
  "createdAt": ISODate("2025-04-10T10:00:00Z"),
  "lastMessage": {
    "text": "Hey! What's up?",
    "senderId": ObjectId("userId1"),
    "createdAt": ISODate("2025-04-10T10:05:00Z")
  }
}
3. messages Collection
Each document stores a single message:

{
  "_id": ObjectId("..."),
  "chatId": ObjectId("chatId1"),
  "senderId": ObjectId("userId1"),
  "type": "text", // or "image", "audio"
  "content": "Hello there!",
  "createdAt": ISODate("2025-04-10T10:05:00Z"),
  "seenBy": [ObjectId("userId1"), ObjectId("userId2")]
}


VITE_SERVER_URL="http://127.0.0.1:3000"