# Backend
## Navigate to backend folder
cd backend

## Create & activate virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate

## Install dependencies
pip install -r requirements.txt

## Run migrations
python manage.py migrate

## Start the server
python manage.py runserver
Backend runs at: http://127.0.0.1:8000

# Frontend
## Navigate to frontend folder
cd frontend

## Install dependencies
npm install

## Start the development server
npm run dev
Frontend runs at: http://localhost:5173
