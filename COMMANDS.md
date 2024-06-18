# Install Django:
    pip3 install 'django<4'

# Uninstall Django:
    pip3 uninstall django

# Install current Version of Django:
    pip3 install django

# Show current Version of Django:
    pip3 show django

# Create new Project:
    django-admin startproject project_name .

# Start Server:
    python3 manage.py runserver

# Migrate
    python3 manage.py makemigrations
    python3 manage.py migrate

# Create Superuser
    python3 manage.py createsuperuser

# Install All-Auth
    pip3 install django-allauth

# Copy AllAuth Templates
    1. create templates folder in root-level of your project
    2. pip3 show django-allauth
    3. Copy the allauth template files to the projects templates directory using this terminal command where <Location> is the file path you copied in the previous step.
    4. cp -r <Location>/allauth/templates/* ./templates/

# Add base template
    create base.html in /templates

# Create App
    python3 manage.py startapp app_name
    then create /templates folder within the app

# Installing Fixtures
    1. create folder fixtures within your app
    2. create your json files within the fixtures folder
    3. execute: python3 manage.py loaddata name_of_json_file_without_extension
    -> now data is within the database