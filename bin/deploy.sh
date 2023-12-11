docker build . \
--build-arg NEXT_PUBLIC_SKARTNER_SERVER=http://server.skartner.com \
--build-arg NEXT_PUBLIC_APP_ENV=staging \
-t rgskartner/skartner-web \
--platform linux/amd64

docker push rgskartner/skartner-web