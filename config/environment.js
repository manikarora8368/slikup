const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "assets",
  session_cookie_key: "blahsomething",
  db: "slikup_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "manikarora8368",
      pass: "xuhxeqvagvvbosud",
      // user: ' rajpalnaman43',
      // pass: 'rbakunytndpdjsfz'
    },
  },
  google_client_id:
    "17146081526-c6nufvh2va0puikrbstscjsemekenm4g.apps.googleusercontent.com",
  google_client_secret: "QdkKlHDJeHY10IAFkaZEKykg",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};
const production = {
  name: "production",
  asset_path: process.env.slikup_asset_path,
  session_cookie_key: process.env.slikup_session_cookie_key,
  db: process.env.slikup_db,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.slikup_gmail_username,
      pass: process.env.slikup_gmail_password,
    },
  },
  google_client_id: process.env.slikup_google_client_id,
  google_client_secret: process.env.slikup_google_client_secret,
  google_callback_url: process.env.slikup_google_callback_url,
  jwt_secret: process.env.slikup_jwt_secret,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};
// module.exports = development;

module.exports =
  eval(process.env.slikup_environment) == undefined
    ? development
    : eval(process.env.slikup_environment);
