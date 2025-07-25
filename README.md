sjcapitalinvestaa-webportal

git add .
git commit -m "Configure for custom domain"
git push
npm run deploy

# Switch to your main branch
git checkout main

# Pull the latest changes from the remote repository
git pull origin main

# Create a new branch and switch to it
git checkout -b feature/your-new-feature-name
