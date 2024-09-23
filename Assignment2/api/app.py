from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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



@app.route('/current', methods=['GET'])
def get_data():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    print(lat, lon)
    url = "https://api.tomorrow.io/v4/timelines?location=34.0030%2C-118.2863&fields=temperature&fields=humidity&fields=pressureSeaLevel&fields=windSpeed&fields=visibility&fields=cloudCover&fields=uvIndex&fields=weatherCode&units=imperial&timesteps=current&startTime=now&endTime=nowPlus6h&apikey=5SfaEn9QUMQGU8Szu302sjx67rg2R6Tp"

    headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip"
    }

    response = requests.get(url, headers=headers)

    return response.json()


@app.route('/nextweek', methods=['GET'])
def get_nextweek():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    print(lat, lon)
    url = "https://api.tomorrow.io/v4/timelines?location="+lat+"%2C"+lon+"&fields=weatherCode&fields=temperatureMax&fields=temperatureMin&fields=windSpeed&units=imperial&timesteps=1d&apikey=5SfaEn9QUMQGU8Szu302sjx67rg2R6Tp"

    headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip"
    }

    response = requests.get(url, headers=headers)

    return response.json()




if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000)