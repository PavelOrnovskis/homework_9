Checklist for the endpoint /test-orders/{id} (PUT METHOD)
| # | Checklist Item | Test data | Status |
|---|------------------------------------------------------------------------------|----------------|--------|
| 1 | Successful update of the order by writing info in body, code 200 | 1, 2, 5, 9, 10 | Passed
| 2 | Unsuccessful update of the order writing a wrong id, code 400 | N/A | 0, 11 | Passed
| 3 | Unsuccessful update of the order because the order does not exist code 404 | -123 | Failed

Checklist for the endpoint /test-orders/{id} (DELETE METHOD)
| # | Checklist Item | Test data | Status |
|---|------------------------------------------------------------------------------|----------------|--------|
| 1 | Successful deletion of the order, code 204 | 1, 2, 5, 9 | Passed |
| 2 | Unsuccessful deletion (order id was written with letters) , code 400 | N/A | Passed

Checklist for the endpoint /test-orders (GET METHOD)
| # | Checklist Item | Test data | Status |
|---|------------------------------------------------------------------------------|----------------|--------|
| 1 | Successful login with correct username and password. code 200 | john, asd | Passed |
| 2 | Unsuccessful login with empty username and password, code 400 | | Failed |

Checklist for the endpoint /api/loan-calc/decision (POST METHOD)
| # | Checklist Item | Test data | Status |
|---|---------------------------------------------------------------------------|----------------|--------|
| 1 | Negative decision, user is not allowed on a loan, very high risk code 200 | LoanDto.generateHighRiskLoanRequest() | Passed |
| 2 | Positive decision, user is allowed on a loan, low risk, code 200 | LoanDto.generateLowRiskLoanRequest() | Passed |
| 3 | Positive decision, user is allowed on a loan, medium risk , code 200 |LoanDto.generateMediumRiskLoanRequest() | Passed |
| 4 | Negative decision, user is younger than 16, code 200 | LoanDto.generateYoungUserRequest() | Failed |
| 5 | Negative testing, request body is empty, code 400 | LoanDto.generateEmptyLoanRequest() | Passed |
