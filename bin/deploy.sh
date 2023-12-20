cp .env ../skartner-instance/envs/skartner-web/temp.env
cp ../skartner-instance/envs/skartner-web/staging.env .env

yarn
yarn build

cp ../skartner-instance/envs/skartner-web/temp.env .env

docker build . --platform linux/amd64 -t rgskartner/skartner-web

docker push rgskartner/skartner-web

source ../skartner-instance/envs/skartner-jenkins/staging.env

# echo "JENKINS_API_KEY: $JENKINS_API_KEY"

curl -X POST http://jenkins.skartner.com/job/restart-skartner-web/build --user dev-rahul:$JENKINS_API_KEY