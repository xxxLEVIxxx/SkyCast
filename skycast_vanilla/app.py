from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

TOMORROWIO_API_KEY = os.getenv('TOMORROWIO_API_KEY')
print("API Key:", TOMORROWIO_API_KEY)

@app.route('/current', methods=['GET'])
def get_data():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    print(lat, lon)
    # url = "https://api.tomorrow.io/v4/timelines?location=34.0030%2C-118.2863&fields=temperature&fields=humidity&fields=pressureSeaLevel&fields=windSpeed&fields=visibility&fields=cloudCover&fields=uvIndex&fields=weatherCode&units=imperial&timesteps=current&startTime=now&endTime=nowPlus6h&apikey=5SfaEn9QUMQGU8Szu302sjx67rg2R6Tp"
    url = "https://api.tomorrow.io/v4/timelines?location="+lat+"%2C"+lon+"&fields=temperature&fields=humidity&fields=pressureSeaLevel&fields=windSpeed&fields=visibility&fields=cloudCover&fields=uvIndex&fields=weatherCode&units=imperial&timesteps=current&startTime=now&endTime=nowPlus6h&apikey="+TOMORROWIO_API_KEY
    headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip"
    }

    response = requests.get(url, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        rawData = response.json()
        intervals = rawData['data']['timelines'][0]['intervals']
        for interval in intervals:
            iso_date= interval['startTime']
            date_obj = datetime.strptime(iso_date, "%Y-%m-%dT%H:%M:%S%z")
            interval['startTime'] = date_obj.strftime("%A, %d %b %Y")
            interval['values']['temperature'] = int(interval['values']['temperature'])

    return jsonify(intervals)
    

@app.route('/nextweek', methods=['GET'])
def get_nextweek():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    print(lat, lon)
    # url = "https://api.tomorrow.io/v4/timelines?location=34.0030%2C-118.2863&fields=temperature&fields=humidity&fields=pressureSeaLevel&fields=windSpeed&fields=weatherCode&fields=visibility&fields=sunsetTime&fields=sunriseTime&fields=precipitationProbability&fields=precipitationType&fields=temperatureMax&fields=temperatureMin&units=imperial&timesteps=1d&startTime=now&endTime=nowPlus5d&apikey=5SfaEn9QUMQGU8Szu302sjx67rg2R6Tp"
    url = "https://api.tomorrow.io/v4/timelines?location="+lat+"%2C"+lon+"&fields=humidity&fields=pressureSeaLevel&fields=windSpeed&fields=weatherCode&fields=visibility&fields=sunsetTime&fields=sunriseTime&fields=precipitationProbability&fields=precipitationType&fields=temperatureMax&fields=temperatureMin&units=imperial&timesteps=1d&startTime=now&endTime=nowPlus5d&apikey="+TOMORROWIO_API_KEY
    
    headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip"
    }

    response = requests.get(url, headers=headers)
    print(url)
    print(response.status_code)
    if response.status_code == 200:
        rawData = response.json()
        intervals = rawData['data']['timelines'][0]['intervals']
        for interval in intervals:
            iso_date= interval['startTime']
            date_obj = datetime.strptime(iso_date, "%Y-%m-%dT%H:%M:%S%z")
            interval['startTime'] = date_obj.strftime("%A, %d %b %Y")
            interval['timeStamp'] = int(date_obj.timestamp()*1000)

            iso_Sunrise = interval['values']['sunriseTime']
            sunrise_obj = datetime.strptime(iso_Sunrise, "%Y-%m-%dT%H:%M:%S%z")
            interval['values']['sunriseTime'] = sunrise_obj.strftime("%I%p").lstrip("0")

            iso_Sunset = interval['values']['sunsetTime']
            sunset_obj = datetime.strptime(iso_Sunset, "%Y-%m-%dT%H:%M:%S%z")
            interval['values']['sunsetTime'] = sunset_obj.strftime("%I%p").lstrip("0")

    return jsonify(intervals)
    

@app.route('/hourly', methods=['GET'])
def get_hourly():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    print(lat, lon)
    # url = "https://api.tomorrow.io/v4/timelines?location=34.0030%2C-118.2863&fields=temperature&fields=humidity&fields=pressureSeaLevel&fields=windSpeed&units=imperial&timesteps=1h&startTime=now&endTime=nowPlus5d&apikey=5SfaEn9QUMQGU8Szu302sjx67rg2R6Tp"
    url = "https://api.tomorrow.io/v4/timelines?location="+lat+"%2C"+lon+"&fields=temperature&fields=humidity&fields=pressureSeaLevel&fields=windSpeed&fields=windDirection&fields=temperature&units=imperial&timesteps=1h&startTime=now&endTime=nowPlus5d&apikey="+TOMORROWIO_API_KEY

    headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip"
    }

    response = requests.get(url, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        rawData = response.json()
        intervals = rawData['data']['timelines'][0]['intervals']
        for interval in intervals:
            iso_date= interval['startTime']
            date_obj = datetime.strptime(iso_date, "%Y-%m-%dT%H:%M:%S%z")
            interval['startTime'] = date_obj.strftime("%A, %d %b %Y")
            interval['timeStamp'] = int(date_obj.timestamp()*1000)

    return jsonify(intervals)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))