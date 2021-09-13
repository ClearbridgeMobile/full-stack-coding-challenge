import express from 'express';

const app = express()
const router = express.Router();

const port = 5000

router.get('/users', function (_req, res) {
  console.log('got request')
  res.json({
    a: 'BBBff'
  })
})
app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})