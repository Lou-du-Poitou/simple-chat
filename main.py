from flask import Flask, send_file, request
from flask_cors import CORS
from flask_limiter import Limiter, util
from flask_socketio import SocketIO

# from gevent.pywsgi import WSGIServer

app = Flask(import_name=__name__, static_folder="./client/")

def getAddress():
    try:
        return request.headers["X-Real-Ip"]
    except:
        return util.get_remote_address()

cors = CORS(app=app, methods=["GET", "POST"])
limiter = Limiter(key_func=getAddress, app=app, default_limits=["500 per hours"], storage_options={})

@app.route("/", methods=["GET"])
def sendIndex():
    return send_file("./client/index.html")

socketio = SocketIO(app=app, cors_allowed_origins="*")

@socketio.event()
def connect():
    return

@socketio.on("message")
def sendMessage(json):
    if len(json["message"]) <= 1500 and len(json["pseudo"]) <= 100 and json["message"].strip() != "": 
        return socketio.emit("message", json)

if __name__ == "__main__":
    app.run(debug=False, port=5000, host="0.0.0.0")
    # httpserver = WSGIServer(listener=("", 10000), application=app)
    # httpserver.serve_forever()
