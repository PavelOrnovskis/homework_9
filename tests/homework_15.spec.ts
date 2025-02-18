import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
const baseURL: string = 'http://localhost:3000/users'

test.describe('User management API with loop', () => {
  test.beforeEach(async ({ request }) => {
    // get all users
    const response = await request.get(`${baseURL}`)
    const responseBody = await response.json()
    // get the number of objects in the array returned
    const numberOfObjects = responseBody.length

    // create an empty array to store all user ID
    const userIDs = []

    // loop through all users and store their ID in an array
    for (let i = 0; i < numberOfObjects; i++) {
      // get user ID from the response
      const userID = responseBody[i].id
      // push is used to add elements to the end of an array
      userIDs.push(userID)
    }

    // delete all users in a loop using previously created array
    for (let i = 0; i < numberOfObjects; i++) {
      // delete user by id
      const response = await request.delete(`${baseURL}/${userIDs[i]}`)
      // validate the response status code
      expect.soft(response.status()).toBe(200)
    }

    // verify that all users are deleted
    const responseAfterDelete = await request.get(`${baseURL}`)
    expect(responseAfterDelete.status()).toBe(200)
    const responseBodyEmpty = await responseAfterDelete.text()
    // validate that the response is an empty array
    expect(responseBodyEmpty).toBe('[]')
  })

  test('TL14-01 GET / - should return empty when no users', async ({ request }) => {
    const response = await request.get(`${baseURL}`)
    expect(response.status()).toBe(200)
    const responseBody = await response.text()
    expect(responseBody).toBe('[]')
  })

  test('TL14-02 Create few users and verify total number', async ({ request }) => {
    const user1 = await request.post(`${baseURL}`)
    const user2 = await request.post(`${baseURL}`)

    const userArray = [user1, user2]

    for (let i = 0; i < userArray.length; i++) {
      const users = userArray[i]

      expect(users.status()).toBe(StatusCodes.CREATED)
      expect(users.json()).toBeDefined()
    }
    const response = await request.get(`${baseURL}`)
    expect(response.status()).toBe(StatusCodes.OK)
    const totalUsers = (await response.json()).length
    expect(totalUsers).toBe(userArray.length)
  })

  test('TL14-03 Delete all users and verify empty response', async ({ request }) => {
    const user1 = await request.post(`${baseURL}`)
    const user2 = await request.post(`${baseURL}`)
    const user3 = await request.post(`${baseURL}`)

    const userArray = [user1, user2, user3]

    for (let i = 0; i < userArray.length; i++) {
      const json = await userArray[i].json()
      const id = json.id

      const deleteResponse = await request.delete(`${baseURL}/${id}`)
      expect(deleteResponse.status()).toBe(StatusCodes.OK)
    }

    const responseAfterDelete = await request.get(`${baseURL}`)
    expect(responseAfterDelete.status()).toBe(StatusCodes.OK)

    const responseBodyEmpty = await responseAfterDelete.json()
    expect(responseBodyEmpty).toStrictEqual([])
  })
})

test('TL14-04 Delete one user and verify other users', async ({ request }) => {
  const user1 = await request.post(`${baseURL}`)
  const user2 = await request.post(`${baseURL}`)
  const user3 = await request.post(`${baseURL}`)

  const userArray = [user1, user2, user3]

  const userToDelete = userArray.pop()

  const json = await userToDelete?.json()
  const id = json.id

  const deleteResponse = await request.delete(`${baseURL}/${id}`)
  expect(deleteResponse.status()).toBe(StatusCodes.OK)
  expect(userArray.length).toBe(2)
})
