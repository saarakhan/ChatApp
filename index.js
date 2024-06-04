const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");

// requiring method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// parse

app.use(express.urlencoded({ extended: true }));

const Chat = require("./models/chat.js");

const port = 8080;
// mongoose connection
main()
    .then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find({});
    res.render("index.ejs", { chats });
    // res.send("Working");
});

// NEW Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

// Create Route
app.post("/chats", (req, res) => {
    let { from, message, to } = req.body;
    let newChat = new Chat({
        from: from,
        message: message,
        to: to,
        created_at: new Date()
    });
    newChat.save()
        .then((res) => {
            console.log("Chat was saved!!");
        })
        .catch((err) => {
            console.log(err);
        })
    res.redirect("/chats");
});


// EDIT Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

// UPDATE ROUTE
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { message: newMsg } = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id,
        { message: newMsg },
        { runValidators: true, new: true });
    res.redirect("/chats");
});

// DESTROY ROUTE
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let delChat = await Chat.findByIdAndDelete(id);
    // console.log(delChat);
    res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
