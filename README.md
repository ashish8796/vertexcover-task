# Coupon Code Service

This project implements a Coupon Code Service using Node.js and TypeScript. The service allows you to create coupons with repeat count limits, validate coupon codes, and apply them while ensuring the usage limits are enforced.

## Table of Contents

- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Add a Coupon](#add-a-coupon)
  - [Validate a Coupon](#validate-a-coupon)
  - [Apply a Coupon](#apply-a-coupon)
- [Running Tests](#running-tests)
- [API Testing with `curl`](#api-testing-with-curl)
  - [Add a Coupon](#add-a-coupon-with-curl)
  - [Validate a Coupon](#validate-a-coupon-with-curl)
  - [Apply a Coupon](#apply-a-coupon-with-curl)

#### I have written all Trade-offs and Scalability Challenges in NOTES.md file.

## Project Setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/coupon-code-service.git
   cd vertexcover-task
   ```

2. Install dependencies:

   ```bash
    npm install
   ```

3. Compile TypeScript:

   ```bash
    npm run build
   ```

### Running the Application

To start the server in development mode with auto-reloading, use:

```bash
npm run dev
```

The application will be running on http://localhost:3000.

To start the server in production mode, use:

```bash
npm start

```

### API Endpoints

#### 1. Add Coupon Repeat Counts

- **Endpoint:** `POST /api/addCouponRepeatCounts`
- **Description:** Add a new coupon with repeat count limits.

- **Request Body:**

  ```json
  {
    "code": "SUMMER21",

    "repeatCountConfig": {
      "globalUsageLimit": 10000,
      "userUsageLimit": 5,
      "userPerDayUsageLimit": 1,
      "userPerWeekUsageLimit": 2
    }
  }
  ```

- **Response:**

  ```json
  {
    "message": "Coupon added successfully"
  }
  ```

#### 2. Validate a Coupon

- **Endpoint:** `GET /api/coupons/validate`
- **Description:** Validate a coupon for a specific user to check if it can be applied.

- **Query Parameters:**

  - `couponCode`: The coupon code to validate.
  - `userId`: The ID of the user.

- **Response:**

  ```json
  {
    "isValid": true
  }
  ```

#### 3. Apply a Coupon

- **Endpoint:** `POST /api/coupons/apply`

- **Description:** Apply a coupon for a specific user, updating the usage counts.

- **Request Body:**

  ```json
  {
    "couponCode": "SUMMER21",
    "userId": "user123"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Coupon applied successfully"
  }
  ```

## Running Tests

To run the unit tests, use:

```bash
npm run test
```

This will execute all the test cases and display the results in the console.

Implemented test cases:

- should invalidate a coupon that exceeds global usage
- should apply a coupon and update user usage counts

Will implement test cases if given more time

- should add a new coupon
- should validate a coupon for a user with no prior usage
- should throw an error when applying a coupon that exceeds usage limit for daily, weekly ans so on.
- should throw an error when validating a coupon that does not exist
- should throw an error when applying a coupon for a non-existent user

### API Testing with curl

Generating 10 users for testing.

#### Add a Coupon with curl

```bash
curl -X 'http://localhost:3000/api/coupons/addCouponRepeatCounts' \
--header 'Content-Type: application/json' \
--data '{
  "code": "SUMMER21",

  "repeatCountConfig": {
        "globalUsageLimit": 10000,
        "userUsageLimit": 5,
        "userPerDayUsageLimit": 1,
        "userPerWeekUsageLimit": 2
    }
}'
```

#### Validate a Coupon with curl

```bash
curl -X 'http://localhost:3000/api/coupons/validate?couponCode=SUMMER21&userId=3'
```

#### Apply a Coupon with curl

```bash
curl -X POST http://localhost:3000/api/coupons/apply \
-H "Content-Type: application/json" \
-d '{
"couponCode": "SUMMER21",
"userId": "3"
}'
```
