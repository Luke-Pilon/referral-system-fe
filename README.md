
# Project Setup

## Prerequisites

-Node.js and npm installed

-Java JDK installed

-Docker installed

-Clone backend (https://github.com/York-Solutions-B2E/luke-pilon-referral-service-be) and frontend(https://github.com/York-Solutions-B2E/luke-pilon-referral-service-fe) repositories


## Frontend Setup

From a terminal in your project folder:

-Install Angular cli: npm install -g @angular/cli

-Install node modules: npm install

-Run the Angular project: ng serve

-Open localhost:4200 in a browser window to view the project

## Backend Setup

-Load the project folder into IntelliJ

-In a terminal, build the project: mvn clean install

-Run the project using IntelliJ 'Run'

## Database Setup

-Follow the following instructions from Microsoft to set up a docker Container running SQLServer: https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&tabs=cli&pivots=cs1-bash

-In IntelliJ, open the Database tab and select 'New', then 'SQL Server'

-Connect to the database using the user and password you created earlier, and the following connection string:
jdbc:sqlserver://localhost:1433;database=<YourDBName>
where <YourDBName> is the name of the database you created earlier.

-Select 'Test Connection' to make sure your inputs are correct.

-In application.properties, set the following properties:
  spring.datasource.url=<connectionstring>
  spring.datasource.username=<user>
  spring.datasource.password=<password>

These will be the same values you entered to connect to the database. 

## You are now ready to use the application
