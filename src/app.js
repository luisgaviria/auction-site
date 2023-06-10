import express from "express";
import path from "path";
// import logger from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import "./boot.js";
import configuration from "./config.js";
import addMiddlewares from "./middlewares/addMiddlewares.js";
import rootRouter from "./routes/rootRouter.js";
import cron from "node-cron";
import herokuSSLRedirect from "heroku-ssl-redirect";
import cors from 'cors';
const sslRedirect = herokuSSLRedirect.default;

import scrapToDatabase from "../src/controllers/scrapToDatabase.js";
// import messageSend from "./utils/messageSend.js";

console.log("This is a test");

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(sslRedirect());

// app.use(cors()) to do to make it work for specific urls

app.use((req, res, next) => {//cors policy

  res.setHeader('Access-Control-Allow-Origin', "*");
  // res.setHeader(
  //   'Access-Control-Allow-Methods',
  //   'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  // );
  res.setHeader('Accept-Encoding','gzip, compress, br');
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
  // res.setHeader('content-security-policy','report-uri/report-csp-violation');
  res.setHeader('permissions-policy','interest-cohort=()');
  res.setHeader('referrer-policy','no-referrer-when-downgrade');
  res.setHeader('strict-transport-security','max-age=31622400; includeSubDomains; preload');
  res.setHeader('x-content-type-options','nosniff');
  res.setHeader('x-frame-options','sameorigin');
  next();
});

// import hbsMiddleware from "express-handlebars";

// app.set("views", path.join(__dirname, "../views"));
// app.engine(
//   "hbs",
//   hbsMiddleware({
//     defaultLayout: "default",
//     extname: ".hbs",
//   })
// );
// app.set("view engine", "hbs");
// app.use(logger("dev"));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "../public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// addMiddlewares(app);
app.use(bodyParser.json());
app.use(rootRouter);

app.use((error,req,res,next)=>{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({
    message: message
  });
});

// cron.schedule("0 0 */3 * * *", () => {
//   scrapToDatabase();
// });


// if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("src/client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"client", "build", "index.html"));
  });
// });

app.listen(configuration.web.port, configuration.web.host, () => {

  console.log("Server is listening...");
  if(!process.env.JWT_SECRET){
    console.log("add .env file!");
  }
});
export default app;
