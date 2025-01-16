import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

//test #1
test('Delete order with correct id, should receive 204', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }

  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'PAVEL',
    customerPhone: '12421412',
    comment: 'food',
    id: 5,
  }

  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    data: requestBody,
    headers: requestHeaders,
  })

  console.log('response status', response.status())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})
//test #2
test('Delete order with incorrect id (letters instead of integer), should receive 400', async ({
  request,
}) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }

  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'PAVEL',
    customerPhone: '12421412',
    comment: 'food',
    id: 5,
  }

  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/asd', {
    data: requestBody,
    headers: requestHeaders,
  })

  console.log('response status', response.status())

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
