import express from "express";
import router from '../routes/main';
import cors from 'cors';

const app = express();

app.use(cors())
app.use('/api',router);

export default app;