import express from 'express';
import path from 'path';
import companies from './routes/companies';
import founders from './routes/founders';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve('dist', 'client', 'src')))

app.get('/', (_req, res) => {
  res.sendFile(path.resolve('dist', 'client', 'src', 'index.html'));
});


app.use('/api', companies);
app.use('/api', founders);

export default app;