import express from "express";
import router from '../routes/main';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));

//Configuracion de Pug
const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('views',viewsFolderPath)
app.set('view engine','pug')
// Termina la configuracion de Pug

app.use(cors())
app.use('/api',router);

export default app;