import connectDB from './config/dbConfig';
import app from './server';

connectDB();

app.listen(4300, () => {
    console.log('listening on 4300');
});