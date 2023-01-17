import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

platformCodes = {
    "BR": ["br1", "americas"],
    "EUN": ["eun1", "europe"],
    "EUW": ["eun1", "europe"],
    "JP": ["jp1", "asia"],
    "KR": ["kr", "asia"],
    "LAN": ["la1", "americas"],
    "LAS": ["la2", "americas"],
    "NA": ["na1", "americas"],
    "OCE": ["oc1", "sea"],
    "TUR": ["tr1", "europe"],
    "RUS": ["ru", "europe"],
    "PHI": ["ph2", "sea"],
    "SG": ["sg2", "sea"],
    "THA": ["th2", "sea"],
    "TW": ["tw2", "sea"],
    "VN": ["vn2", "sea"],
}

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.environ.get("RIOT_API_KEY")
api_url = os.environ.get("API_URL")


@app.route("/user/<region>/<name>", methods=["GET"])
def getUserByInput(name, region):
    code = region.upper()
    if code in platformCodes:
        url = f"https://{platformCodes[code][0]}{api_url}/lol/summoner/v4/summoners/by-name/{name}?api_key={api_key}"
        response = requests.get(url)
        return response.json(), response.status_code
    return jsonify({
        "status": {
            "message": "Invalid Region"
        }
    }), 404


@app.route("/user/<region>/<name>/match-history/<puuid>", methods=["GET"])
def getMatchHistory(region, name, puuid):
    code = region.upper()
    url = f"https://{platformCodes[code][1]}{api_url}/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10&api_key={api_key}"
    response = requests.get(url)

    if len(response.json()) == 0:
        return jsonify({
            "status": {
                "message": "Match history not found"
            }
        }), 404

    return response.json(), response.status_code


@app.route("/<region>/match/<id>", methods=["GET"])
def getMatchById(region, id):
    code = region.upper()
    url = f"https://{platformCodes[code][1]}{api_url}/lol/match/v5/matches/{id}?api_key={api_key}"

    response = requests.get(url)

    return response.json()
