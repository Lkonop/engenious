# Category 3: API Testing & HTTP Protocols (10 Questions)

## 1. What are common HTTP status codes?
**Answer:**
- **2xx (Success):** 200 OK, 201 Created.
- **4xx (Client Error):** 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found.
- **5xx (Server Error):** 500 Internal Server Error, 503 Service Unavailable.

## 2. GET vs. POST vs. PUT vs. PATCH.
**Answer:**
- **GET:** Retrieve data (Idempotent).
- **POST:** Create new resource.
- **PUT:** Replace entire resource (Idempotent).
- **PATCH:** Update partial resource.

## 3. How do you automate API tests in Playwright?
**Answer:** I use the `request` fixture. I send calls (e.g., `request.post`), capture the JSON response, and validate the status, headers, and body schema using `expect`.

## 4. Authentication vs. Authorization.
**Answer:** 
- **Authentication (AuthN):** Who are you? (Login).
- **Authorization (AuthZ):** What can you do? (Permissions).

## 5. What is JSON Schema validation?
**Answer:** Verifying that an API response matches a blueprint (correct types, mandatory fields). It ensures the "contract" between backend and frontend isn't broken.

## 6. How do you test a GraphQL API?
**Answer:** Since GraphQL uses a single POST endpoint, I send the `query` or `mutation` string in the request body. I validate that the response doesn't contain an `errors` array and that the `data` object has the expected structure.

## 7. What is API Rate Limiting and how do you test it?
**Answer:** It’s a limit on how many requests a user can make in a timeframe. I test this by using a loop to send rapid requests until I receive a **429 Too Many Requests** status code.

## 8. Explain the OAuth2 flow from a testing perspective.
**Answer:** It involves requesting an **Access Token** using client credentials, then including that token in the `Authorization: Bearer <token>` header for subsequent API calls. I automate the token retrieval to keep tests independent.

## 9. What is Idempotency in APIs?
**Answer:** An operation is idempotent if performing it multiple times has the same effect as performing it once (e.g., GET, PUT, DELETE). I test this by calling an endpoint twice and verifying the system state remains consistent.

## 10. What is Contract Testing (e.g., Pact)?
**Answer:** It's a way to ensure two services (Consumer and Provider) can communicate. Instead of testing the whole system, we test if the Provider meets the specific requirements defined by the Consumer. It's much faster than E2E testing.
