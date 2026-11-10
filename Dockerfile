FROM mcr.microsoft.com/dotnet/sdk:10.0-noble AS build
WORKDIR /src
COPY src/GeekReceptionist.Api/GeekReceptionist.Api.csproj src/GeekReceptionist.Api/
RUN dotnet restore src/GeekReceptionist.Api/GeekReceptionist.Api.csproj
COPY src/ src/
RUN dotnet publish src/GeekReceptionist.Api/GeekReceptionist.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0-noble AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "GeekReceptionist.Api.dll"]
