import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { upload } from './middleware/multer.middleware.js';
import { handleAIRequest, handleTexttoText } from './controller/ai.controller.js';
import sensorRoute from './router/sensor.route.js';
import airoute from './router/ai.route.js';
import userapi from './router/user.route.js';
import { errorHandler } from './middleware/error.middleware.js';
import cookieParser from "cookie-parser"
import { community } from './router/community.route.js';
import news from './router/news.route.js';
import esewa from './router/esewa.route.js';
import khalti from './router/khalti.routes.js';
import notification from './router/notification.route.js';
import {mqttrouter} from './services/mqtt.js'
import ejs from "ejs";
import path from "path";




const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "./src/views"));




app.use(express.static('public'));

app.use(
  cors({
    origin: ["http://localhost:8000","http://localhost:5173", " http://192.168.1.118:8170","http://192.168.154.34:8170"],

    credentials: true, 
  })
);

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sensor',sensorRoute);
app.use('/ai',airoute);
app.use('/user',userapi);
app.use('/community',community)
app.use('/news',news)
app.use('/esewa',esewa)
app.use('/khalti',khalti)
app.use('/notification', notification)
app.use('/mqtt',mqttrouter)





app.get('/', (req, res) => {
  console.log("Hello /");
  res.send('Hello, World!');
});

app.use(errorHandler);

export { app };  