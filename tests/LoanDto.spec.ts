import { LoanDto } from './DTO/LoanDto'
import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Positive Low risk decision, code 200', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateLowRiskLoanRequest(),
    },
  )

  const responseBody = await response.json()

  console.log('response status', response.status())
  console.log('response body', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('Positive Medium risk decision, code 200', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateMediumRiskLoanRequest(),
    },
  )

  const responseBody = await response.json()

  console.log('response status', response.status())
  console.log('response body', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskDecision).toBe('positive')
})
test('Negative High risk decision, code 200', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateHighRiskLoanRequest(),
    },
  )

  const responseBody = await response.json()

  console.log('response status', response.status())
  console.log('response body', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskDecision).toBe('negative')
})
test('Negative decision because user is too young, code 200', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateYoungUserRequest(),
    },
  )

  const responseBody = await response.json()

  console.log('response status', response.status())
  console.log('response body', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('negative')
})
test('Negative testing, request body is empty, code 400', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: LoanDto.generateEmptyLoanRequest(),
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
