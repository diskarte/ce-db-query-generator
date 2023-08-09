# Cruise Evaluation DB SQL Query Generator
This Node application generates SQL queries to insert new values to the CE Database through CSV files.

## Prerequisites
### PostgreSQL Installation
#### MacOS
You can follow the instructions on how to install PostgreSQL on your MacOS machine from the [PostgreSQL official homepage](https://www.postgresql.org/download/macosx/).

#### Windows
You can follow the instructions on how to install PostgreSQL on your Windows machine from the [PostgreSQL official homepage](https://www.postgresql.org/download/windows/).

#### Ubuntu
Run the following commands to install PostgreSQL on an Ubuntu machine:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service
```
___
### Node.js Installation
#### Mac OS
You can install Node.js through downloading the binary installer in their [homepage](https://nodejs.org/en) or using [Homebrew](https://brew.sh/) then running `brew install node`.

> Recommendation: You can use NVM to manage Node.js installations. For more information, visit their [Github repository](https://github.com/nvm-sh/nvm).

#### Windows
You can install Node.js through downloading the binary installer in their [homepage](https://nodejs.org/en).

### Ubuntu
Run the following commands to install Node.js on an Ubuntu machine:
```bash
sudo apt update
sudo apt install nodejs
```
> Recommendation: You can use NVM to manage Node.js installations. For more information, visit their [Github repository](https://github.com/nvm-sh/nvm).
> 
*Note: At the time of writing, the current LTS of Node.js is v18.17.0*

## Initializing the Database
Using a GUI (pgAdmin, etc.) to run SQL scripts or `psql` run the following commands:
```postgresql
CREATE DATABASE ce_eval;
CREATE USER ce_admin WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE ce_eval TO ce_admin;
```
> Replace `password` with your own password.

Once the database has been created, connected to the database and use the `initialize_db.sql` under the `database` directory to populate the database with the default schema and static values.

---
## How To Use The Generator
> If it's your first time using the generator, you have to download and install the dependencies using `npm i`.

1. Prepare the CSV file following the templates stored under the `csv-templates` directory.
2. Place the CSV file to their corresponding directory. *For example, if you want to enter new data to the cruise table, use the cruise CSV template, and place the file under the `csv/cruises` directory.*
3. Then run either one of the following commands:
```bash
# Replace the `--csvfile` value according to the CSV filename you have created.

# Generate insert SQL queries to the cruise and proposal tables
npm run generate-cruise-query --csvfile=cruises.csv 

# Generate insert SQL queries to the responses and responder tables
npm run generate-responses-query --csvfile=responses.csv 

# Generate insert SQL queries to the researcher tables
npm run generate-researcher-query --csvfile=researchers.csv 
```
4. This will generate an output file that you can find in each domain's corresponding folders in the `output` directory.
You can then copy the queries inside the generated `.txt` files in run the script in your GUI.

> Note: Please use a minimum of 100 rows for the CSV files for the responder and response table query generator because one row generates over 100 inserts and running thousands of INSERT queries may crash your GUI.
