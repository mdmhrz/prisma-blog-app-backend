import express, { Application, Request, Response } from 'express';
import { postRouter } from './modules/post/post.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors'
import { commentRouter } from './modules/comment/comment.router';
import errorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';


const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || 'http://localhost:4000',
    credentials: true

}))


// this route is for better auth
app.all("/api/auth/*splat", toNodeHandler(auth));


app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');

});



// all other routes
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter)

app.use(errorHandler)




// not found routes
app.use(notFound)



export default app;