import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

//test #1
test('Successful login with correct username and password, code 200', async ({ request }) => {
  const requestBody = {
    username: 'john',
    password: 'asd',
  }
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=john&password=asd',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()

  console.log('response status', response.status())
  console.log('response body', responseBody)

  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody.message).toBe('Login successful for user: john')
})
//test #2
test('Unsuccessful login with an empty credentials, code 400', async ({ request }) => {
  const requestBody = {
    username: '',
    password: '',
  }
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=&password=',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()

  console.log('response status', response.status())
  console.log('response body', responseBody)

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
