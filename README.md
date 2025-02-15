# DevOps Learning Path: Deploying a Node.js App

This tutorial will guide you through deploying a Node.js application while following DevOps best practices. Each step includes a task, research hints, and helpful links. This is not a step-by-step guide; you are encouraged to search for solutions on your own.

## Prerequisites
- Basic knowledge of Git, GitHub, and Linux command line.
- A computer with Git and Node.js installed.
- A GitHub account (create one if you don’t have it).
- An AWS account (free-tier available).

---

## Step 1: Fork the Repository
**Task:**
- Sign up for GitHub (if you haven't already).
- Fork the provided repository to your GitHub account.
- Clone the forked repository to your local machine.

**Hints:**
- Search for "GitHub create repository tutorial."
- Use `git clone <repo-url>` to get the repo on your machine.

**Useful Links:**
- [GitHub Docs: Forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

---

## Step 2: Create a Simple Node.js App
**Task:**
- Inside your cloned repository, create a simple Node.js app.
- The app should display: `Hello, I'm version #1` when accessed in a browser.
- Use `express` or `http` module.

**Hints:**
- Look up "simple Node.js HTTP server."
- Use `npm init -y` to create a `package.json` file.

**Useful Links:**
- [Node.js HTTP Module](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/)
- [Express.js Guide](https://expressjs.com/)

---

## Step 3: Protect the `main` Branch
**Task:**
- Set up branch protection rules on GitHub to prevent direct pushes to `main`.

**Hints:**
- Search for "GitHub protect main branch."

**Useful Links:**
- [GitHub Docs: Managing Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-a-branch-protection-rule)

---

## Step 4: Set Up GitHub Actions for Code Linting
**Task:**
- Create a GitHub workflow that triggers on pull requests from branches named `feature/<something>` into `main`.
- The workflow should run a linter (e.g., ESLint) to validate the Node.js code.

**Hints:**
- Search for "GitHub Actions Node.js Linting."
- Use `eslint` (`npm install eslint --save-dev`).

**Example `workflow.yml` File:**
```yaml
name: Lint Code

on:
  pull_request:
    branches:
      - main
    paths:
      - '**/*.js'

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'

    - name: Install dependencies
      run: npm install

    - name: Run ESLint
      run: npx eslint .
```

**Useful Links:**
- [GitHub Actions Basics](https://docs.github.com/en/actions/learn-github-actions)
- [Setting up ESLint](https://eslint.org/docs/latest/use/getting-started)

---

## Step 5: Create a Deploy Key
**Task:**
- Generate an SSH key pair for secure GitHub access.
- Add the public key as a deploy key in GitHub.

**Hints:**
- Search for "GitHub deploy key setup."
- Use `ssh-keygen -t rsa -b 4096` to generate a key.

**Useful Links:**
- [GitHub Docs: Deploy Keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)

---

## Step 6: Set Up an AWS EC2 Instance
**Task:**
- Create an AWS account (if not already done).
- Launch a free-tier EC2 instance (t2.micro or similar).
- Allow inbound traffic on ports 22 (SSH) and 80 (HTTP).

**Hints:**
- Search for "AWS EC2 setup free tier."
- Use `security groups` to allow necessary ports.

**Useful Links:**
- [AWS EC2 User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/)

---

## Step 7: Deploy the Node.js App Manually
**Task:**
- SSH into the EC2 instancee
- Install necessary packages (Node.js, Git).
- Clone the repository using the deploy key.
- Run the Node.js app and access it via `http://<your-ec2-ip>`.

**Hints:**
- Search for "install Node.js on AWS EC2."
- Use `ssh -i <keyfile> ec2-user@<ip>` to connect.

**Useful Links:**
- [AWS Connect to EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html)

## Step 8: Add Repository Secrets for Deployment
**Task:**
- Go to GitHub repository settings.
- Add the following secrets:
  - `MACHINE_USER`: The SSH username (e.g., `ec2-user`).
  - `MACHINE_SSH_KEY`: The private key content for SSH authentication.
  - `MACHINE_IP`: The EC2 instance's public IP address.

**Hints:**
- Search for "GitHub Actions repository secrets."

**Useful Links:**
- [GitHub Docs: Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## Step 9: Modify Workflow to Deploy on Merge
**Task:**
- Update the GitHub Actions workflow to deploy the app automatically when a pull request is merged.

**Hints:**
- Search for "GitHub Actions deploy via SSH."

**Example Deployment Step:**
```yaml
- name: Deploy to EC2
  run: |
    echo "${{ secrets.MACHINE_SSH_KEY }}" > private_key.pem
    chmod 600 private_key.pem
    ssh -o StrictHostKeyChecking=no -i private_key.pem ${{ secrets.MACHINE_USER }}@${{ secrets.MACHINE_IP }} << 'EOF'
      cd /home/ec2-user/learning-devops-101
      git pull origin main
      sudo fuser -k 80/tcp
      node server.js &
    EOF
```

**Useful Links:**
- [GitHub Docs: Deploying with SSH](https://docs.github.com/en/actions/deployment/targeting-different-platforms)

---

## Step 10: Thest the changes
**Task:**
- Create a new branch `feature/new-version`
- Modify the code to display a different text
- Push the code
- Create a Pull Request to main
- Validate that the action run properly
- Enter to http://<your-ec2-ip> and see the new message

---

## Step 11: Stop your EC2
**Task**
- Enter to your AWC Consolse
- Stop the EC2 if not used or delete it (if deleted make sure the EBS attached is also deleted)

This is a very good practice to avoid AWS to charge us money.

## Conclusion
You have now built a simple CI/CD pipeline to deploy a Node.js app on AWS EC2 using GitHub Actions. Continue exploring DevOps practices by:
- Adding logging and monitoring with CloudWatch.
- Using Docker instead of direct Node.js execution.
- Deploying to Kubernetes for scalability.

Happy learning! 🚀

