# Soccer Data API Service

Microservicio Python que usa `soccerdata` para obtener fixtures y estadísticas de ligas de fútbol.

## Instalación

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows Git Bash)
source venv/Scripts/activate

# Instalar dependencias
pip install -r requirements.txt
```

## Uso

```bash
# Iniciar servidor
python app.py
```

El servidor estará disponible en `http://localhost:5001`

## Endpoints

### GET /health

Health check del servicio

**Ejemplo:**

```bash
curl http://localhost:5001/health
```

### GET /api/leagues

Lista de ligas disponibles

**Ejemplo:**

```bash
curl http://localhost:5001/api/leagues
```

### GET /api/fixtures/<league_code>

Obtiene fixtures de una liga

**Query params:**

- `season` (opcional): Temporada en formato YYZZ (ej: '2425')
- `force_cache` (opcional): Si 'true', usa caché

**Ejemplo:**

```bash
curl "http://localhost:5001/api/fixtures/premier-league?season=2425"
```

**Response:**

```json
{
  "matches": [
    {
      "id": "premier-league_2425_arsenal_chelsea_20241204",
      "competition": "premier-league",
      "homeTeam": "Arsenal",
      "awayTeam": "Chelsea",
      "homeScore": 2,
      "awayScore": 1,
      "status": "finished",
      "date": "2024-12-04T15:00:00",
      "round": 15
    }
  ],
  "count": 380,
  "league": "premier-league",
  "season": "2024-2025"
}
```

## Ligas Disponibles

- `premier-league` - Premier League (Inglaterra)
- `la-liga` - La Liga (España)
- `serie-a` - Serie A (Italia)
- `bundesliga` - Bundesliga (Alemania)
- `ligue-1` - Ligue 1 (Francia)

## Variables de Entorno

Ver archivo `.env` para configuración completa.

## Caché

Los datos se almacenan en `./cache` por defecto. Este directorio puede ser eliminado para forzar la descarga de datos actualizados.
