import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose, { Types } from 'mongoose';

const app = express();

import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);

app.use(cors({
  origin: 'https://web-chat-six-navy.vercel.app', // your Vercel frontend URL
  credentials: true, // if using cookies or auth tokens
}));
app.use(express.json());

const port = 3000;
const localhost = process.env.SERVER_URL;

// ###################################################################### socket.io st

const io = new Server(server, {
  cors: {
    origin: '*', // Replace with frontend domain in production
    methods: ['GET', 'POST']
  }
});
io.on('connection', (socket) => {
  console.log('🟢 New socket connected:', socket.id);

  // Listen for messages
  socket.on('sendMessage', (message) => {
    console.log('📩 Message received:', message);

    // Optionally save to MongoDB here...

    // Emit message to all clients in the same chat room
    io.emit('receiveMessage', message);
  });

  // Join a chat room
  socket.on('joinRoom', (chatId) => {
    socket.join(chatId);
    console.log(`📥 User joined room: ${chatId}`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
});




// ###################################################################### socket.io end

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://ram_ahir:mqCfPtKbzQT3DZSK@web-chat-cluster.hpnn8as.mongodb.net/", {
  dbName: 'WebChatApp', // Optional: name your DB
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ############################################################################ Mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  Email: String,
  username: String,
  password: String,
  profileImg: String,

}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  members: Array,
  messages: Array

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Chat = mongoose.model("Chat", chatSchema);

//############################################################################### Root test route
app.get('/api/test', (req, res) => {
  res.send('Hello World!');
});

// ##################################################################################### Create user route
app.post('/api/create-users', async (req, res) => {
  const { Email, name, username, password, profileImg } = req.body;

  if (!Email || !name || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newUser = new User({
      Email,
      name,
      username,
      password,
      profileImg
    });

    await newUser.save(); // ✅ Save to MongoDB

    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ##################################################################################### Create Chat route
app.post('/api/create-chat', async (req, res) => {
  const { members, messages } = req.body;

  if (!members || members.length < 2) {
    return res.status(400).json({ error: 'Chat must have at least two members' });
  }

  try {
    // ✅ Sort members to keep consistent order
    const sortedMembers = [...members].sort();

    // ✅ Check if chat already exists
    const existingChat = await Chat.findOne({ members: sortedMembers });

    if (existingChat) {
      return res.status(200).json({
        message: 'Chat already exists',
        chat: existingChat
      });
    }

    // ✅ Create new chat if not found
    const newChat = new Chat({
      members: sortedMembers,
      messages: messages || [] // allow empty messages
    });

    await newChat.save();

    res.status(201).json({
      message: 'Chat created successfully',
      chat: newChat
    });

  } catch (err) {
    console.error("Error saving chat:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ##################################################################################### Create Message route
app.post('/api/create-message', async (req, res) => {
  const { sender, receiver, content, createdAt } = req.body;

  if (!sender || !receiver || content === '' || !createdAt) {
    return res.status(400).json({ error: 'Message is not valid format' });
  }

  try {
    // Normalize members (sorted so [A, B] == [B, A])
    const members = [sender, receiver].sort();

    // Find the chat
    const chat = await Chat.findOne({ members });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Construct message object
    const message = { sender, content, createdAt };

    // Push the message to messages array
    chat.messages.push(message);

    // Save the updated chat
    await chat.save();

    res.status(201).json({
      message: 'Message added to chat successfully',
      chatId: chat._id,
      newMessage: message
    });

  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ##################################################################################### Get Message route

app.post('/api/get-messages', async (req, res) => {
  const { members } = req.body;

  if (!members || members.length < 2) {
    return res.status(400).json({ error: 'Chat must have at least two members' });
  }

  try {
    const sortedMembers = [...members].sort();

    // ✅ Correct usage of the Chat model
    const chat = await Chat.findOne({ members: sortedMembers });

    if (!chat) {
      return res.status(200).json({
        message: 'Chat does not exist',
        messages: []
      });
    }

    // ✅ Extract message array from chat
    const messages = chat.messages;

    res.status(200).json({
      message: 'Messages loaded successfully',
      messages: messages
    });

  } catch (err) {
    console.error("Error loading chat:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// app.listen(port, () => {
//   console.log(`✅ Server running at ${localhost}:${port}`);
// });

// Start the server
server.listen(port, () => {
  console.log(`✅ Server running with socket.io at ${localhost}:${port}`);
});
