# News-WebApp

This is a news web application that provides the latest news to its users with a good user interface for reading. Users can read and search for news, as well as create an account to personalize their experience. The application is built using Express.js, MongoDB, and EJS. 


## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine for building fast and scalable network applications.
- **Express.js**: A web application framework for Node.js, designed for building web applications and APIs.
- **EJS**: An embedded JavaScript templating engine for generating HTML markup with plain JavaScript.
- **HTML**: The standard markup language for creating web pages and other information to be displayed in a web browser.
- **CSS**: A stylesheet language used for describing the presentation of a document written in a markup language like HTML.
- **JavaScript**: A high-level, interpreted programming language commonly used to create interactive effects within web browsers.
- **API**: An application programming interface, a set of rules and protocols for building and integrating software applications.
- **Mongoose**: An Object Data Modeling library for MongoDB and Node.js, providing a schema-based solution to model application data.
- **Passport.js**: An authentication middleware for Node.js, supporting authentication using a username and password, as well as various OAuth providers.
- **dotenv**: A zero-dependency module that loads environment variables from a .env file into process.env in Node.js projects.
- **body-parser**: A Node.js body parsing middleware, providing support for parsing JSON, raw, text, and URL-encoded form data.
- **Axios**: A promise-based HTTP client for the browser and Node.js, supporting easy-to-use features for making HTTP requests.


## Screenshots
Screenshots include 1) Homepage 2) Search Bar 3) Reading page 4) Section page

<img src="https://github.com/NINAD-17/News-WebApp/assets/94175390/bf8366e4-ea5a-4ee8-b2f6-dd9c089d0a1b" alt="Homepage of news Web application" width="300" height="200"> <img src="https://github.com/NINAD-17/News-WebApp/assets/94175390/5f057fd8-5ce3-45a0-b6b1-674b04408fad" alt="Section of news Web application" width="300" height="200">

<img src="https://github.com/NINAD-17/News-WebApp/assets/94175390/850d590c-d3ff-44cb-ad72-b866087e354b" alt="Search bar" width="300" height="200"> <img src="https://github.com/NINAD-17/News-WebApp/assets/94175390/dedabb95-fab9-4951-92a4-20f668d99b5f" alt="Reading page" width="300" height="200">

 
## Installation and Setup

1. Clone this repository using the URL from the code button: 'https://github.com/NINAD-17/News-WebApp.git'

2. Navigate to the local repository of this project and install all dependencies using the command `npm i`.

3. Don't forget to add a `.env` file at the root of the project.

4. Create an account on newsapi.org and obtain an API key. Add the API key to the `.env` file.

5. To run this app, use the command `npx nodemon app.js`. Then, go to your browser and search for `localhost:3000`.

6. If you make any changes to the code, please submit a pull request so that it can be merged into the main branch of this repository.


## Known Issues & problems

-**Code Refactoring:** The codebase, particularly the CSS file, requires refactoring to improve organization and readability.
-**Login Functionality:** The current implementation of the login functionality is suboptimal and requires improvement.
-**Temporary Solution:** A temporary solution for the login issue was implemented by creating two different header files. This approach is not ideal and should be -revisited.
-**Weather API Integration:** The integration of the weather API is incomplete. A section has been reserved on the home page for weather news, but the API has not yet been integrated.


## Future Improvements:
-**Code Organization:** Refactor the codebase to improve its cleanliness and organization.
-**CSS Improvements:** Enhance the CSS to improve the overall design and user experience.
-**Light Mode:** Add a light mode option to the website for improved accessibility.
-**Responsiveness:** Improve the responsiveness of the website to ensure a seamless experience across different devices.
-**Weather API Integration:** Integrate the weather API to display weather news on the home page.
-**Logic Improvements:** Review and improve the logic of the codebase to enhance its efficiency and maintainability.


## Disclaimer
Please note that the logo used in this project is for educational purposes only. It was utilized as part of the learning process for web development and is not intended for commercial use. (India today logo)
