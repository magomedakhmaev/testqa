This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Install and run
1. Clone the project and run `npm install` command in project root.
2. Create database named `testqa` (in order to use database with different name, open `config/config.json` file and changed `database` value ).
3. Install sequelize-cli globally by running command: `npm i -g sequelize-cli`.
4. Run migrations by following command: `sequelize db:migrate`. Check for 3 newly created tables: `Questions`, `Answers` and `SequelizeMeta`. 
    Note: the table names can be lowercased in Windows system. 
5. Start project by running `npm start` command. This will serve the react app on port `3000`, while backend server will be running on port `8000`.    


NOTE: to run backend server separately run `npm run server` command. 
