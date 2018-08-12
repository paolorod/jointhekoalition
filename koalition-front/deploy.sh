
export PROJECT_ID=jointhekoalition
export GOOGLE_APPLICATION_CREDENTIALS="C:\Users\paolo\Documents\JoinTheKoalition-f02c328b5bc4.json"

gcloud auth login
docker-machine create --driver google --google-project jointhekoalition --google-zone us-central1-a --google-machine-type f1-micro gcloud
