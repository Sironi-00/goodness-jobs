const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors({
    origin: "*",
    credentials: true,
}));

const store = new session.MemoryStore();
app.use(session({
    key: "secret",
    secret: "random",
    resave: true,
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        maxAge: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        secure: true
    },
    store: store
}))

app.use(express.static("build"));

const routes = require("./Routes/index");
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening localhost:${PORT}`));