# Run Project Dev Container
docker build -t daily-toolset .

docker run -dp 127.0.0.1:3000:3000 daily-toolset

docker run -it --rm -v /home/javi/workspace/dev/projects/daily-toolset:/app -p 3000:3000 daily-toolset

docker start <name> -i

bootstrap
docker run -it  -p 5000:5000 old

