docker build . \
--build-arg NEXT_PUBLIC_SKARTNER_SERVER=http://localhost:8000 \
--build-arg NEXT_PUBLIC_APP_ENV=development \
--build-arg NEXT_PUBLIC_LOCAL_IP="192.168.1.2" \
-t rgskartner/skartner-web