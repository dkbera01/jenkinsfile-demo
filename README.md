# Flask + Express CI/CD Demo with Jenkins

This project contains two simple web applications:
- **Flask App** (Python): Exposes a `/api/hello` endpoint on port `5000`
- **Express App** (Node.js): Exposes a `/api/hello` endpoint on port `3000`

## ✅ Project Structure

```
flask-express-demo/
├── flask-app/
│   ├── app.py
│   ├── requirements.txt
└── express-app/
    ├── app.js
    ├── package.json
└── Jenkinsfile   
```

## 🚀 Setup on EC2 Instance

1. **Setup Jenkins**
   ```bash
   sudo apt update
   sudo apt install openjdk-17-jdk -y
   sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
   https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
   echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
   https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
   /etc/apt/sources.list.d/jenkins.list > /dev/null
   sudo apt-get update
   sudo apt-get install jenkins
   sudo systemctl enable jenkins
   sudo systemctl start jenkins
   sudo systemctl status jenkins
   ```
   - Jenkins: `http://<EC2-IP>:8080/`

   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

2. **Install required packages**:
   ```bash
   sudo apt update
   sudo apt install -y python3 python3-pip nodejs npm git
   sudo apt install python3.12-venv
   sudo npm install -g pm2
   ```

3. **Access APIs**:
   - Flask: `http://<EC2-IP>:5000/api/hello`
   - Express: `http://<EC2-IP>:3000/api/hello`

## ⚙️ Jenkins CI/CD

Each app includes a `Jenkinsfile`:
- Clones the repository
- Installs dependencies
- Starts or restarts the app using PM2

## 🧪 Testing the APIs

- Flask:
  ```bash
  curl http://<EC2-IP>:5000/api/hello
  ```

- Express:
  ```bash
  curl http://<EC2-IP>:3000/api/hello
  ```

---

For full setup, you can integrate GitHub webhooks with Jenkins to automate deployment on each push.
