from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/hello')
def hello():
    return jsonify({'message': 'Hello from Flask jenkins is working with pipline'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
