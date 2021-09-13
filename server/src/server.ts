import express from 'express';
import path from 'path';

const app = express()
const router = express.Router();
const port = 3000


app.use(express.static(path.resolve('dist', 'client', 'src')))
app.get('/', (_req, res) => {
  res.sendFile(path.resolve('dist', 'client', 'src', 'index.html'));
});

router.get('/users', function (_req, res) {
  console.log('got regquest')
  res.json({
    a: 'BBBff'
  })
})

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})