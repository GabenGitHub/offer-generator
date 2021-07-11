import {Request, Response} from 'express';
import express from 'express';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
});

app.listen(4000, () => {
    console.log('listening on 4000');
});