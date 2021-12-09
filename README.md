The Project uses 
    1. ReactJs UI Framework
    2. Material UI - Styling Framework
    3. Eslint - Linter
    4. Prettier - Formatter
    5. Husky - To execute Git pre-commit hooks

To Install dependencies please run the following

    npm install

To run the project please run the following

    npm start


Notes:

1. When a git commit is made husky runs a pre-commit hook which triggers eslint and prettier on staged files
2. Multi environment support can be implemented by adding env.nonprod or env.prod files and updating npm scripts
3. The Project depends on the backend as http://localhost:3001