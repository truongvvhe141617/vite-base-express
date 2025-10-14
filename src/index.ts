import  express, { Request, Response } from 'express';
import  dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (request: Request, response: Response) => {
    response.send('Hello Victor');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

