import app from './main'
import request from 'supertest'

test('sample test', () => {
  expect(1 + 1).toBe(2)
})

test('get /', async () => {
  const response = await request(app).get('/')

  expect(response.status).toStrictEqual(200)
  expect(response.text).toStrictEqual('Hello World!')
})
