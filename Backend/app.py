from flask import Flask, request
from flask_cors import CORS
import chess_guess
import QHO
import json
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/chess')
def get_chess_guesses_flask():
    fen = request.args.get('fen')
    return chess_guess.get_chess_guesses(fen)

@app.route('/api/post_qho_first', methods=['POST'])
def post_qho_first_flask():
    n = request.json['params']['n']
    if type(n) != int:
        n = 0
    run_data = QHO.post_qho_first(n)
    run_data_json = json.dumps(run_data)
    return run_data_json

@app.route('/api/post_qho_run', methods=['POST'])
def post_qho_run_flask():
    run_data = request.json['params']['run_data']
    run_data = QHO.post_qho_run(run_data)
    run_data_json = json.dumps(run_data)
    return run_data_json
    

if __name__ == '__main__':
    app.run(ssl_context='adhoc')