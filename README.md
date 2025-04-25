# How to run the project

## Running the Application (TA, do this part)
This application should be run on a device running **MacOS** or **Windows**

In a command line, run these commands at the root directory of the project
```
1. chmod +x setup.sh run.sh
2. ./setup.sh
3. ./run.sh
```

This will start the front-end and back-end for the application. After running ```run.sh``` navigate to ```http://localhost:3000``` in your web browser to access the application

## Using the application
1. Navigate to http://localhost:3000
2. Sign into the application with a Google account or username and password
3. Observe the file upload screen. It will randomly generate a phrase for you to say to verify yourself.
4. Upload a **wav** file in the box and wait for the model prediction results

### Running the Model Notebook (If desired - NOT required!)
If you would like to train a new model, you will have to run the model training notebook on Google colab. We include pretrained model files to simplify the process of using our application.

**If you would like to just see the output of the notebook without running it, please see the file at https://github.com/sallyq1/SafeSpeak---AI-Voice-Fraud-Detection-Tool/blob/master/Model/Model-Notebook.ipynb**

#### OS Requirements
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
