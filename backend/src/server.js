import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import notesRouter from './routes/notesRoutes.js'
import { connect } from './config/db.js';
import rateLimiter from './middlewares/ratelimiter.js';

const app = express();
const PORT = process.env.PORT || 5001;  
const __dirname = path.resolve()

dotenv.config()


if(process.env.NODE_ENV!=="production"){
    app.use(cors({
    origin:"http://localhost:5173",
})
);
}

app.use(express.json())
app.use(rateLimiter)


app.use('/api/notes',notesRouter)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

connect().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server started on PORT",PORT);
})
});

