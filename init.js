const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main()
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
let allChats = ([
    {
        from: "jetha",
        to: "babita",
        message: "Kaise ho babita ji?",
        created_at: new Date()
    },
    {
        from: "babita",
        to: "jetha",
        message: "Main theek hoon, aap kaise hain?",
        created_at: new Date()
    },
    {
        from: "mehta",
        to: "popatlal",
        message: "Popatlal, tumhare article kaafi achhe the.",
        created_at: new Date()
    },
    {
        from: "popatlal",
        to: "mehta",
        message: "Shukriya Mehta saab!",
        created_at: new Date()
    },
    {
        from: "bhide",
        to: "iiyer",
        message: "Iyer bhai, science project kaise chal raha hai?",
        created_at: new Date()
    },
    {
        from: "iiyer",
        to: "bhide",
        message: "Bhide bhai, project bahut achhe se chal raha hai.",
        created_at: new Date()
    },
    {
        from: "champak",
        to: "jetha",
        message: "Jetha, dukan pe dhyan dena.",
        created_at: new Date()
    },
    {
        from: "jetha",
        to: "champak",
        message: "Haan bapuji, main dhyan de raha hoon.",
        created_at: new Date()
    }
]);

Chat.insertMany(allChats);