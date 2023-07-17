# Full stack assessment

Hey! Congrats on making it this far!

This assessment is about checking whether you and TempleHS are a good fit, technically. We'd like you to show us what you know and can do. We'd like to emphasize that it's definitely okay not to know everything.

We'd like you to create a full-stack application that manages medical appointments.

You have 7 days to do the assessment and then send it back to us.

Please, feel free to ask questions. Don't stay stuck for too long if you have any questions or think there's any missing information here.

We hope you have fun doing this. Good luck!

## Context
You tried booking an appointment with your local dentist but the process was tedious and boring. Seeing how difficult it was for the dentist's office to handle the users they were getting, you decided to build a web app for them to handle the process.

To make your first version of the app easier, the hospital provides you with their doctors' and dentists' availability info and then ask you to work on allowing patients book appointments and get confirmation.

You have one week to complete this amazing feat!

## Requirements

### General
- Use `git` to version your code. Make sure you use git workflow, branching and committing at appropriate intervals.
- The entire project must be written in TypeScript
- Deploy the app on any platform of your choice
- Ensure you have proper documentation. Include your app's deploy link in the README.

### Back-end
You'll develop a REST API service to create and read data on the appointment booking process

- Develop the backend with `Node.js`
- Use an `Express` or `Koa` server
- The database must be `PostgreSQL`
- Do not use an ORM. Use `knex` for database migrations and queries
- Provide a way to seed your database with the relevant data you'll need to complete the application. This would include provider's name, bio, title, and available slots.\
- Ensure patients cannot book the same appointment slot multiple times
- Document your APIs
- Write appropriate tests


### Front-end
- Use `React`
- Use `TailwindCSS` for styling
- The designs to follow are available on [Figma](https://www.figma.com/file/apU5vThBU0bWalEsIhiDqL/TempleHS-Assessment?type=design&node-id=0-1&mode=design&t=Ht9lFcGORuuR1eG0-0)
- Feel free to use placeholder values where necessary
- Add a confirmation message using a toast, modal, page or any other means you prefer when a patient successfully books an appointment.

### Bonus
- Use `Docker` so anyone can run the project
- Use `Next.js` instead of two separate `Node.js` and `React` repositories.
- Implement search by date, time, or distance

## Acceptance Criteria
As a patient on the homepage
- I am provided with a list of providers and their availability
- When I select a specific time slot on each provider's card, I am taken to the appointment confirmation page
- When I confirm the appointment, I see a toast or another sort of message confirming the appointment has been bokked successfully.
