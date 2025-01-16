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
