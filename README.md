
# Exercise Tracker Project

This is the Exercise Tracker project, part of the freeCodeCamp APIs and Microservices certification. 
You can find the challenge details on the [freeCodeCamp website](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker).

## Project Overview

The Exercise Tracker allows users to log their exercises with details such as:
- Description of the exercise
- Duration
- Date of the exercise

Users can also retrieve logs of their exercises over a specific time range.

## Key Features

- Users can create a new user to track exercises.
- Users can log exercises with a description, duration, and date.
- Users can view exercise logs for a specific user, with optional date range filtering.
- MongoDB is used to store user and exercise data.
- Moment.js is used to handle date formatting.

## Technologies Used

- Node.js
- Express
- MongoDB (via Mongoose)
- Moment.js (for date manipulation)
- dotenv (for environment variable management)

## Installation and Setup

To run this project locally, follow the steps below:

1. Clone this repository:
    ```
    git clone https://github.com/Ore00/exercisetracker.git
    ```

2. Navigate to the project directory:
    ```
    cd exercisetracker
    ```

3. Install the required dependencies:
    ```
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:
    ```
    MONGO_URI=your_mongo_connection_string
    ```

5. Start the development server:
    ```
    npm start
    ```

## API Endpoints

The following endpoints are available for interacting with the Exercise Tracker API:

- **POST** `/api/users`: Create a new user.
- **POST** `/api/users/:_id/exercises`: Log an exercise for a specific user.
- **GET** `/api/users`: Retrieve all registered users.
- **GET** `/api/users/:_id/logs`: Retrieve the exercise log for a specific user, with optional date range filtering.

## Example Usage

1. Create a new user:
    ```
    POST /api/users
    ```
    Response:
    ```json
    {
      "username": "JohnDoe",
      "_id": "123456"
    }
    ```

2. Log an exercise:
    ```
    POST /api/users/123456/exercises
    ```
    Request Body:
    ```json
    {
      "description": "Running",
      "duration": 30,
      "date": "2023-09-26"
    }
    ```

3. Retrieve exercise logs for a user:
    ```
    GET /api/users/123456/logs?from=2023-01-01&to=2023-09-26
    ```

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).