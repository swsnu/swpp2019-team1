# Matchmaker

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# How to run
## Frontend
 - yarn install
 - yarn start
## Backend
 - pip install -r requirements.txt
 - python manage.py runserver

# How to test
## Frontend
We used Enzyme for frontend testing
- yarn test --coverage --watchAll=false
## Backend
- coverage run --source='./matchmaker' manage.py test
- coverage report
- coverage run --branch --source='./matchmaker' manage.py test
- coverage report

