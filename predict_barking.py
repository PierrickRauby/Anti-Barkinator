# Imports for the script
import numpy as np
import os 
import errno
import librosa
from keras.models import model_from_json
import pyaudio
from gpiozero import LED
import wave
# from time import sleep

# fifo to triger python execution form javascript
FIFO='PIPE'

# Audio file configuration 
form_1 = pyaudio.paInt16 # 16-bit resolution
chans = 1 # 1 channel
samp_rate = 44100 # 44.1kHz sampling rate
chunk = 2048 # 2^12 samples for buffer
record_secs = 2 # seconds to record
dev_index = 1 # device index found by p.get_device_info_by_index(ii)
audio = pyaudio.PyAudio() # create pyaudio instantiation

# To control the LEDs on the board

led22 = LED(22)
led17 = LED(17)
Led27 = LED(27)
# while True:
    # led.on()
    # sleep(1)
    # led.off()
    # sleep(1)

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

def record_audio(audio_counter,audio): 
    # this function generates a new audio file :
    led22.on()
    wav_output_filename = 'data/audio_record//test_'+str(audio_counter)+'.wav' # name of .wav file


    # create pyaudio stream
    stream = audio.open(format = form_1,rate = samp_rate,channels = chans, \
                                input_device_index = dev_index,input = True, \
                                                    frames_per_buffer=chunk)
    print("recording")
    frames = []

    # loop through stream and append audio chunks to frame array
    for ii in range(0,int((samp_rate/chunk)*record_secs)):
        data = stream.read(chunk,exception_on_overflow=False)
        frames.append(data)

    print("finished recording")
    led22.off()
    return wav_output_filename

counter=0
while True:
    with open(FIFO) as fifo:
        print('new occurence')
        led17.on()
        while True:
            data_fifo=fifo.read()
            path=record_audio(counter,audio)
            counter+=1
            pred=save_STFT(path)

            if pred==0:
                print(path)
                print(pred)
                print("That's a dog!")
            else:
                print(path)
                print(pred)
                print("Nothing!")
            if len(data_fifo)==0:
                led17.off()
                break
