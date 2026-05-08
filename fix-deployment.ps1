# Fix Vercel Git Submodule Errors
Write-Host "Cleaning up Git submodules to fix Vercel deployment..." -ForegroundColor Cyan

# 1. Remove the cached tracking of the problematic folders
git rm --cached client -r --ignore-unmatch
git rm --cached "client/where-is-my-cargo" -r --ignore-unmatch
git rm --cached "client/gym" -r --ignore-unmatch

# 2. Delete any hidden .git folders inside the subdirectories so they become normal folders
if (Test-Path "client\.git") { Remove-Item -Recurse -Force "client\.git" }
if (Test-Path "client\where-is-my-cargo\.git") { Remove-Item -Recurse -Force "client\where-is-my-cargo\.git" }
if (Test-Path "client\gym\.git") { Remove-Item -Recurse -Force "client\gym\.git" }

# 3. Add everything back as normal files
git add .
git commit -m "fix: removed all internal .git folders so Vercel can deploy everything correctly"
git push new-origin main

Write-Host "Done! Your code is pushed. Now go to Vercel and Redeploy!" -ForegroundColor Green
