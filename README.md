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

1. **Install required packages**:
   ```bash
   sudo apt update
   sudo apt install -y python3 python3-pip nodejs npm git
   sudo npm install -g pm2
   ```

2. **Run Flask App**:
   ```bash
   cd /var/lib/jenkins/workspace/jenkinsfile-demo/flask-app
   pip3 install -r requirements.txt
   pm2 start app.py --interpreter python3 --name flask-app
   ```

3. **Run Express App**:
   ```bash
   cd /var/lib/jenkins/workspace/jenkinsfile-demo/express-app
   sudo npm install
   pm2 start app.js --name express-app
   ```

4. **Access APIs**:
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
