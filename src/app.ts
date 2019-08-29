import express, {Application, Request, Response} from 'express';

const app = express();


app.get('/', (req: Request,res: Response) => {
    res.send('Hello')
});

app.listen(3000,() => console.log('Server has satarted in 3000 port ...'));
