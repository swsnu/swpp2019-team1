# Matchmaker

[![Build Status](https://travis-ci.org/swsnu/swpp2019-team1.svg?branch=master)](https://travis-ci.org/swsnu/swpp2019-team1)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team1/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2019-team1?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team1&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team1)

# How to run
## Frontend
 - `yarn install`
 - `yarn start`
## Backend
 - `pip install -r requirements.txt`
 - `python manage.py runserver`

# How to test
## Frontend
### Unit Test
Used `Enzyme` for frontend testing
- `yarn testc`
### Lint Check
Used `Eslint` with `eslint-config-airbnb`
- `yarn lint`
## Backend
### Unit Test
Used `Pytest` and `Coverage`
- `coverage run --branch --source="." -m pytest`
- `coverage report --fail-under=80 -m`
### Lint Check
Used `Pylint`
- `pylint ./*/`
