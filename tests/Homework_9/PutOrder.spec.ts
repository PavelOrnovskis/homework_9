import {expect, test } from "@playwright/test"

import { StatusCodes } from "http-status-codes"

//test #1
test("Update order with correct data, should receive code 200", async ({request} ) => {
    const requestHeaders = {
        "api_key" : "1234567890123456" ,
    };

    const requestBody = {
        "status": "OPEN",
        "courierId": 0,
        "customerName": "PAVEL",
        "customerPhone": "12421412",
        "comment": "food",
        "id": 5

    };

    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
        data: requestBody,
        headers: requestHeaders
    })
    const responseBody = await response.json();

    console.log("response status", response.status());
    console.log("response body", responseBody)

    expect(response.status()).toBe(StatusCodes.OK)

})

//test #2
test("Update order with incorrect id, should receive code 400", async ({request} ) => {
    const requestHeaders = {
        "api_key" : "1234567890123456" ,
    };

    const requestBody = {
        "status": "OPEN",
        "courierId": 0,
        "customerName": "PAVEL",
        "customerPhone": "12421412",
        "comment": "food",
        "id": 11

    };
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/11', {
        data: requestBody,
        headers: requestHeaders

    })
    const responseBody = await response.json();

    console.log("response status", response.status());
    console.log("response body", responseBody)

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)

})
//test #3
test("Update order with non-existent id, should receive code 404", async ({request} ) => {
    const requestHeaders = {
        "api_key": "1234567890123456",
    };

    const requestBody = {
        "status": "OPEN",
        "courierId": 0,
        "customerName": "PAVEL",
        "customerPhone": "12421412",
        "comment": "food",
        "id": -123

    };
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/-123', {
        data: requestBody,
        headers: requestHeaders

    })
    const responseBody = await response.json();

    console.log("response status", response.status());
    console.log("response body", responseBody)

    expect(response.status()).toBe(StatusCodes.NOT_FOUND)
})