import { expect, test } from '@playwright/test'
import { LoginDTO } from './DTO/LoginDTO'
import { StatusCodes } from 'http-status-codes'
import { ApiClient } from '../api/ApiClient'
import { OrderDto } from './DTO/OrderDto'

test.describe('Login tests', () => {
  test('TL-12-1 Successful authorization', async ({ request }) => {
    const response = await request.post(`https://backend.tallinn-learning.ee/login/student`, {
      data: LoginDTO.createLoginWithCorrectData(),
    })

    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.OK)
  })
  test('TL-12-2 Successful authorization and order creation WITH API', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const responseCreateOrder = await request.post(`https://backend.tallinn-learning.ee/orders`, {
      data: OrderDto.generateRandomOrderDto(),
      headers: {
        Authorization: 'Bearer ' + apiClient.jwt,
      },
    })
    console.log(await responseCreateOrder.text())
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
  })

  test('TL-12-3  HOMEWORK#1 Successful authorization, order creation and order status WITHOUT API', async ({
    request,
  }) => {
    const responseLogin = await request.post(`https://backend.tallinn-learning.ee/login/student`, {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    expect(responseLogin.status()).toBe(StatusCodes.OK)

    const responseCreateOrder = await request.post(`https://backend.tallinn-learning.ee/orders`, {
      data: OrderDto.generateRandomOrderDto(),
      headers: {
        Authorization: 'Bearer ' + (await responseLogin.text()),
      },
    })
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
    const createdOrder = OrderDto.serializeResponse(await responseCreateOrder.json())
    expect(createdOrder.id).toBeDefined()
    expect(createdOrder.id).toBeGreaterThan(0)

    const responseOrderStatus = await request.get(
      `https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,
      {
        headers: {
          Authorization: 'Bearer ' + (await responseLogin.text()),
        },
      },
    )
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)
    const requestedOrder = OrderDto.serializeResponse(await responseOrderStatus.json())
    expect(requestedOrder.status).toBeDefined()
    expect(requestedOrder.status).toBe('OPEN')
    console.log(await responseOrderStatus.text())
  })
})
test('TL-12-4 HOMEWORK#2 Successful authorization, order creation and order deletion without API', async ({
  request,
}) => {
  const responseLogin = await request.post(`https://backend.tallinn-learning.ee/login/student`, {
    data: LoginDTO.createLoginWithCorrectData(),
  })
  expect(responseLogin.status()).toBe(StatusCodes.OK)

  const responseCreateOrder = await request.post(`https://backend.tallinn-learning.ee/orders`, {
    data: OrderDto.generateRandomOrderDto(),
    headers: {
      Authorization: 'Bearer ' + (await responseLogin.text()),
    },
  })
  expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
  const createdOrder = OrderDto.serializeResponse(await responseCreateOrder.json())
  const responseDeleteOrder = await request.delete(
    `https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,
    {
      headers: {
        Authorization: 'Bearer ' + (await responseLogin.text()),
      },
    },
  )
  expect(responseDeleteOrder.status()).toBe(StatusCodes.OK)
  console.log(responseDeleteOrder.statusText())

  const responseCheckOrder = await request.get(
    `https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,
    {
      headers: {
        Authorization: 'Bearer ' + (await responseLogin.text()),
      },
    },
  )
  console.log(responseCheckOrder.status())
})
test('TL-12-5 HOMEWORK #3 Successful authorization and order creation with status WITH API', async ({
  request,
}) => {
  const apiClient = await ApiClient.getInstance(request)
  const createOrderWithId = await apiClient.createOrderAndReturnOrderId()
  const responseCheckOrder = await request.get(
    `https://backend.tallinn-learning.ee/orders/${createOrderWithId}`,
    {
      headers: {
        Authorization: 'Bearer ' + apiClient.jwt,
      },
    },
  )
  expect(responseCheckOrder.status()).toBe(StatusCodes.OK)
  console.log(await responseCheckOrder.json())
})

test('TL-12-6 HOMEWORK #4 Successful authorization and order deletion WITH API', async ({
  request,
}) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  const responseCheckOrder = await request.get(
    `https://backend.tallinn-learning.ee/orders/${orderId}`,
    {
      headers: {
        Authorization: 'Bearer ' + apiClient.jwt,
      },
    },
  )

  expect(responseCheckOrder.status()).toBe(StatusCodes.OK)
  console.log(await responseCheckOrder.json())

  await apiClient.deleteOrderById(orderId)

  const responseAfterDelete = await request.get(
    `https://backend.tallinn-learning.ee/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${apiClient.jwt}`,
      },
    },
  )

  console.log(responseAfterDelete.status())
  expect(responseAfterDelete.status()).toBe(StatusCodes.OK)
})
