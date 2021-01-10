# Imports for the script
import numpy as np
import os 
import errno
import librosa
from keras.models import model_from_json


FIFO='PIPE'

# Reloading the model

# Model reconstruction from JSON file

with open('barking_recognition/notebook/architecture.json', 'r') as f:
    model = model_from_json(f.read())
# Load weights into the new model
model.load_weights('barking_recognition/notebook/weights.h5')

# Helping function
def save_STFT(file_path):
    # read audio data
    audio_data, sample_rate = librosa.load(file_path)

    #trimming
    trimmed, index = librosa.effects.trim(audio_data, top_db=20, frame_length=512, hop_length=64)
    # extract features
    stft =np.mean(np.abs(librosa.stft(trimmed, n_fft=512, hop_length=256, win_length=512)).T,axis=0)
    # save features

    result = model.predict(np.array( [ stft,] )  )
    predictions = [np.argmax(y) for y in result]
    return predictions[0]



counter=0
while True:
    with open(FIFO) as fifo:
        print('New occurence')
        while True:
            data=fifo.read()
            counter+=1
            if counter%3==0:
                path='barking_recognition/UrbanSound/data/street_music/101848.wav'
            elif counter%3==1:
                path='barking_recognition/UrbanSound/data/children_playing/196067.wav'
            else:
                path='barking_recognition/UrbanSound/data/dog_bark/100032.wav'

            pred=save_STFT(path)

            if pred==0:
                print(path)
                print(pred)
                print("That's a dog!")
            else:
                print(path)
                print(pred)
                print("Nothing!")
            if len(data)==0:
                break

