from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "<p>Hello Flask</p>"
    

app.run("127.0.0.1",port=8080)