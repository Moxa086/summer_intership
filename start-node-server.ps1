Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Starting Sundown Studio Server..." -ForegroundColor Green
Write-Host ""
npm start
Read-Host "Press Enter to exit" 