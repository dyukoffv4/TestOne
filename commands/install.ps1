Set-Location (Join-Path $PSScriptRoot "..")

Set-Location test
npm install
Set-Location ..

Set-Location server
python -m venv venv
. .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
deactivate
Set-Location ..