import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { UserDTO } from './DTO/UserDTO'
import { APIRequestContext } from 'playwright-core'

test('TL-14-5 return empty users through GET method', async ({ request }) => {
  const allUsersResponse = await request.get('http://localhost:3000/users')
  const json = await allUsersResponse.json()
  expect(allUsersResponse.status()).toBe(StatusCodes.OK)
  expect(json.length).toBe(0)
})
