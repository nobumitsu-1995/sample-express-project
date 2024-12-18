import express from 'express'
import os from 'os'
import cluster from 'cluster'
import { circleRouter } from '@Infrastructure/Router/circleRouter'
import { userRouter } from '@Infrastructure/Router/userRouter'

if (cluster.isPrimary) {
  const numberOfCPUs = os.cpus().length

  for (let i = 0; i < numberOfCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code) => {
    console.log(`worker pid: ${worker.process.pid}`)
    console.log(`error code: ${code}`)
    cluster.fork()
  })
} else {
  const app = express()
  const PORT = 3000

  app.use(express.json())
  app.use('/user', userRouter)
  app.use('/circle', circleRouter)

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Worker id is running on ${cluster.worker?.id}`)
  })
}
