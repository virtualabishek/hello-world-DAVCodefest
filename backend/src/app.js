import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userapi from './router/user.route.js';
import path from "path";




const app = express();

app.get('/', (req, res) => {
  console.log("Hello /");
  res.send('Hello, World!');
});


app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "./src/views"));





app.use(express.static('public'));

app.use(
  cors({
    origin: ["http://localhost:8000","http://localhost:5173", " http://192.168.1.118:8170","http://192.168.154.34:8170"], 
    credentials: true, 
  })
);

// Middlewares
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes

app.use('/user',userapi);







app.use(errorHandler);

export { app };  