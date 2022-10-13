CONTAINER_IMAGE=$1
CONTAINER_NAME=$2
HOST=$3
PORT=$4
CONTAINER_INSTANCE=$5

echo "-> PREPARE docker-compose"
sed -i 's|$CONTAINER_NAME|'"$CONTAINER_NAME"'|g' docker-compose.yml
sed -i 's|$CONTAINER_IMAGE|'"$CONTAINER_IMAGE"'|g' docker-compose.yml
sed -i 's|$HOST|'"$HOST"'|g' docker-compose.yml
sed -i 's|$PORT|'"$PORT"'|g' docker-compose.yml

echo "-> PULL container $CONTAINER_IMAGE"
docker pull $CONTAINER_IMAGE -q

echo "-> STOP container $CONTAINER_NAME"
docker stop  $CONTAINER_NAME

echo "-> START container $CONTAINER_NAME"
docker-compose up -d

echo "-> CLEAN UP unused images"
docker image prune -a -f
 