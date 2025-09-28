cd $(dirname $(realpath $0))/..

cd test
npm install
cd ..

cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
source venv/bin/deactivate
cd ..