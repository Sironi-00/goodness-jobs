const path = require("path");
const express = require("express");
const session = require("cookie-session");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.disable("X-Powered-By");

app.use(session({
    key: "secret",
    secret: "random",
    resave: true,
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        maxAge: 1 * 60 * 60 * 1000,
        httpsOnly: true,
        secure: true
    },
}))


// app.use((req, res, next)=> {
//     console.log(`${req.method} ${req.url} auth:${req.session.authenticated}`);
//     next()
// });

const routes = require("./Routes/index");
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));
app.get("/*", (req, res, next)=> {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening localhost:${PORT}`));