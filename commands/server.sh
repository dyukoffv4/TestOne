cd $(dirname $(realpath $0))/..

source venv/bin/activate
uvicorn run app.main:app --host 0.0.0.0 --port 80
source venv/bin/deactivate