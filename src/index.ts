import  express, { Request, Response } from 'express';
import  dotenv from 'dotenv';
import { connectMongoDB } from './v1/utils/database';
import bodyParser from 'body-parser'
import * as v1 from "./v1/routers/router"
import cors from "cors";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000; 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use(express.json())

app.use(
  cors({
    origin: "*",
  })
);

//use Router
app.use("/v1", v1.router)
//connect database mongoose
connectMongoDB();

app.get('/', (request: Request, response: Response) => {
    response.send('Hello Victor');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

