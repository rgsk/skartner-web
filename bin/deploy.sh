cp .env ../envs/skartner-web/temp.env
cp ../envs/skartner-web/staging.env .env

yarn build

cp ../envs/skartner-web/temp.env .env

docker build . --platform linux/amd64 -t rgskartner/skartner-web

docker push rgskartner/skartner-web