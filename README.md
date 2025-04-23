# How to run the project

## Running the Application (TA, do this part)
commands for backend:
```
1. cd into Back-End folder
2. nvm install node
3. pip install -r requirements.txt
4. flask run
```

commands for frontend
```
1. cd into Front-End folder
2. npm install
3. npm run dev
```

## Running the Model Notebook (If desired - NOT required!)
If you would like to train a new model, you will have to run the model training notebook on Google colab. We include pretrained model files to simplify the process of using our application.

### OS Requirements
Our team is running the notebook on Google Colab. We take the notebook file and upload it onto google colab.

We are using the free tier and we have the training data (and requirements.txt file) uploaded to a Google Drive account with the same folder structure listed below. Note that the data is located in a folder on the root of the google drive account titled "notebook_data".
```
notebook_data/
├── real/
├───── clip1.wav
├───── ...
├── fake/
├───── clip1.wav
├───── ...
├── requirements.txt
├── michael-real.wav
├── michael-fake.wav

The notebook will read from the path /content/drive/MyDrive/notebook_data to access this folder
```

Here is the Google drive folder that our team is currently using: https://drive.google.com/drive/folders/1TpkC1UkAB7qs4hgGqV5GLjY4yNDMXQbL?usp=sharing

The notebook will take a decent amount of time to run completely (10-15min or so) because it is training the model on all of the provided audio clips and generating the augumented audio files as well.
 
This notebook (if running locally) would work best on a MacOS device or a Linux device. However, singificant changes would need to be made to the notebook so it's not suggested. You would have to change paths and remove references to loading and mounting Google Drive.

Note that all of our audio clips are .wav files because we wanted a lossless audio format. The input to the model/project application are expected to be a .wav files as well.
