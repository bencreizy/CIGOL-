# CIGOL-Backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app) # Allows the React frontend to talk to this Python backend


@app.route('/handshake', methods=['POST'])
def handshake():
    data = request.json
    active_mode = data.get('mode')
    
    # Logic to pivot the entire backend focus to the active_mode
    print(f"App Dedication Locked: {active_mode}")
    
    return jsonify({
        "status": "synchronized",
        "active_mode": active_mode,
        "message": "Bridge established."
    }), 200


if __name__ == '__main__':
    app.run(port=5000, debug=True)