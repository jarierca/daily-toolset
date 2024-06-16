# Run Project Dev Container
docker build -t daily-toolset .

docker run -dp 127.0.0.1:3000:3000 daily-toolset

// Con volumen para que se auto-actualice cuando hagamos un cambio (dev container sin intalar node solo con node)
docker run -it --rm -v /home/javi/workspace/dev/projects/daily-toolset:/app -p 3000:3000 daily-toolset

// Arrancar el contenedor ya existente <name> y -i para interactivo ("ver su consolas")
docker start <name> -i

bootstrap
docker run -it  -p 5000:5000 old

