const path = require("path");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

const store = new session.MemoryStore();
app.use(
    session({
        key: "secret",
        secret: "random",
        resave: true,
        saveUninitialized: false,
        cookie: {
            sameSite: false,
            maxAge: 24 * 60 * 60 * 1000,
            httpsOnly: true,
            secure: true,
        },
        store: store,
    })
);

const routes = require("./Routes/index");
app.use("/api", routes);

app.use("/*", express.static(path.join(__dirname,"build")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening localhost:${PORT}`));
