from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def api():
    data = {
        "street": "1241 W 37th Pl",
        "city": "Los Angeles",
        "state": "CA",
        "autoDetect": "true"
    }
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"


    return jsonify(data)
