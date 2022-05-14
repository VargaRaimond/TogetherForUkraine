cd server && docker build . -t server && cd ..
cd client && docker build . -t client && cd ..

docker swarm init
docker stack deploy -c portainer-agent-stack.yml portainer
docker stack deploy -c docker-compose.yml pwebidp
