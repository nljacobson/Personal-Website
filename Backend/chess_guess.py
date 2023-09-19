import numpy as np
import tensorflow as tf
from top_players import get_player_name
from tensorflow import keras

def get_chess_guesses(fen):
    # Split into lines
    game = get_numeric_game(fen)
    white_model = tf.keras.models.load_model('./Backend/white_player_model')
    black_model = tf.keras.models.load_model('./Backend/black_player_model')
    white_output = white_model.predict(game).ravel()
    black_output = black_model.predict(game).ravel()
    print(white_output.argmax())
    white_sum = sum(white_output)
    black_sum = sum(black_output)
    whiteGuesses = []
    blackGuesses = []
    for i in range(10):
        white_player = str(get_player_name(white_output.argmax()))
        black_player = str(get_player_name(black_output.argmax()))
        white_player_certainty = white_output[white_output.argmax()]/white_sum
        black_player_certainty = black_output[black_output.argmax()]/black_sum
        if white_player_certainty > 0:
            whiteGuesses.append([white_player, "{cert:.2f}%".format(cert=100*white_player_certainty)])
        if black_player_certainty > 0:
            blackGuesses.append([black_player, "{cert:.2f}%".format(cert=100*black_player_certainty)])
        white_output[white_output.argmax()] = -1.0
        black_output[black_output.argmax()] = -1.0
    return {'whiteGuesses': whiteGuesses, 'blackGuesses': blackGuesses}

def get_numeric_game(fen):
    piece_to_int = {
    'P': 1,
    'N': 2,
    'B': 3,
    'R': 4,
    'Q': 5,
    'K': 6
}
    piece_dict = {
        'p':11,
        'P':21,
        'n':12,
        'N':22,
        'b':13,
        'B':23,
        'r':14,
        'R':24,
        'q':15,
        'Q':25,
        'k':16,
        'K':26,
        '1':0,
    }
    fen_first_split = fen.split(sep='/')
    # Remove win loss info from the end of fen
    fen_first_split[7] = fen_first_split[7].split(sep = ' ')[0]
    fen_array = []
    for i in range(8):
        # Split into pieces (8, 8)
        fen_array.append(list(fen_first_split[i]))
    game = []
    for row in fen_array:
        new_row = []
        for i in range(len(row)):
            if row[i] in piece_dict:
                new_row.append(piece_dict[row[i]])
            elif row[i].isnumeric():
                for j in range(int(row[i])):
                    new_row.append(0)
            else:
                print('Unknow Character {}'.format(row[i]))
        game.append(new_row)
    game = np.array(game).transpose()
    game_tensor = tf.convert_to_tensor([game])
    return game_tensor