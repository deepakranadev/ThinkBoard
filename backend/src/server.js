import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import notesRouter from './routes/notesRoutes.js'
import { connect } from './config/db.js';
import rateLimiter from './middlewares/ratelimiter.js';

const app = express();
const PORT = process.env.PORT || 5001;  

dotenv.config()


app.use(cors({
    origin:"http://localhost:5173",
})
);
app.use(express.json())
app.use(rateLimiter)


app.use('/api/notes',notesRouter)

connect().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server started on PORT",PORT);
})
});

