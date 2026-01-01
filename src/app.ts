import express, { Application, Request, Response } from 'express';
import { postRouter } from './modules/post/post.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors'


const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || 'http://localhost:4000',
    credentials: true

}))


// this route is for better auth
app.all("/api/auth/*splat", toNodeHandler(auth));


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/post', postRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');

});


export default app;