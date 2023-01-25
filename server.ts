import bodyParser from "body-parser";
import cors from "cors";
import dotEnv from "dotenv";
import errorHandler from "errorhandler";
import express from "express";
import session from "express-session";
import responseTime from "response-time";

import router from "./router";

dotEnv.config();

const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler({ log: true }));
}

app.use(responseTime());
app.use(express.static("./public"));
app.use(cors());
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
