# Backend: Django Loan Calculator API

## Overview
This Django application provides API endpoints for managing customers and their loan offers, and calculating loan repayments.

## Setup Instructions

### Requirements
- Python 3.8+
- Django 3.2+
- Django REST Framework

### 
### Installation
1. Clone the repository.
2. Create a virtual environment through:
   ```bash
   python -m venv bbenv
3. Activate the environment, execute
   ```bash
   (On MacOS / Linux)
   source bbenv/bin/activate 
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
3. Initialize the database:
    ```bash
    python manage.py migrate

## Running the Application
### Run the server using:
```bash
python manage.py runserver

## Running Tests
### Execute tests by running:
python manage.py test

## Improvements
- Code Review: to integrate typescript types more.
- Code Review: unused/boilerplate files should be removed.
- Code Review: A lot of refactoring required for better project architecture(for shared artefacts).
- Implement authentication and authorization.
- More test cases can be added for all CRUD operations.
- Add more comprehensive error handling and input validation.
- Integrate a CI/CD pipeline for automated testing and deployment.
- Error monitoring, logging can be improved.