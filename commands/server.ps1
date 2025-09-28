Set-Location (Join-Path $PSScriptRoot "..")

. .\venv\Scripts\Activate.ps1
uvicorn run app.main:app --host 0.0.0.0 --port 80
deactivate