"""
Soccer Data API Service
Microservicio Python que usa soccerdata para obtener fixtures y estadísticas
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import soccerdata as sd
import pandas as pd
from datetime import datetime
import os
from dotenv import load_dotenv
import logging

# Cargar variables de entorno
load_dotenv()

# Configurar logging
logging.basicConfig(
    level=os.getenv('SOCCERDATA_LOGLEVEL', 'INFO'),
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Crear app Flask
app = Flask(__name__)

# Configurar CORS
CORS(app, resources={
    r"/api/*": {
        "origins": [
            os.getenv('FRONTEND_URL', 'http://localhost:5173'),
            os.getenv('BACKEND_URL', 'http://localhost:5000')
        ]
    }
})


class SoccerDataService:
    """Servicio para obtener datos de fútbol usando soccerdata"""
    
    # Mapeo de códigos internos a nombres de liga de soccerdata
    LEAGUE_MAPPING = {
        'premier-league': 'ENG-Premier League',
        'la-liga': 'ESP-La Liga',
        'serie-a': 'ITA-Serie A',
        'bundesliga': 'GER-Bundesliga',
        'ligue-1': 'FRA-Ligue 1'
    }
    
    def __init__(self):
        self.cache_dir = os.getenv('SOCCERDATA_DIR', './cache')
        os.makedirs(self.cache_dir, exist_ok=True)
        logger.info(f"SoccerData cache directory: {self.cache_dir}")
    
    def get_current_season(self):
        """
        Determina la temporada actual en formato YYZZ
        Ejemplos: '2425' para 2024-2025, '2324' para 2023-2024
        """
        now = datetime.now()
        if now.month >= 8:  # Temporada empieza en agosto
            return f"{str(now.year)[2:]}{str(now.year + 1)[2:]}"
        else:
            return f"{str(now.year - 1)[2:]}{str(now.year)[2:]}"
    
    def format_season_display(self, season_code):
        """Convierte '2425' a '2024-2025'"""
        if len(season_code) == 4:
            year1 = f"20{season_code[:2]}"
            year2 = f"20{season_code[2:]}"
            return f"{year1}-{year2}"
        return season_code
    
    def get_fbref_scraper(self, league_code, season=None):
        """Crea instancia de FBref scraper con configuración"""
        league_name = self.LEAGUE_MAPPING.get(league_code)
        if not league_name:
            raise ValueError(f"League '{league_code}' not supported")
        
        if season is None:
            season = self.get_current_season()
        
        logger.info(f"Creating FBref scraper for {league_name}, season {season}")
        
        return sd.FBref(
            leagues=[league_name],
            seasons=[season],
            data_dir=self.cache_dir
        )
    
    def get_fixtures(self, league_code, season=None, force_cache=False):
        """
        Obtiene fixtures de una liga
        
        Args:
            league_code: Código de la liga (ej: 'premier-league')
            season: Temporada en formato YYZZ (ej: '2425')
            force_cache: Si True, usa caché sin actualizar
        
        Returns:
            Lista de partidos en formato dict
        """
        try:
            fbref = self.get_fbref_scraper(league_code, season)
            
            # Leer schedule (calendario de partidos)
            logger.info(f"Fetching fixtures for {league_code}...")
            schedule = fbref.read_schedule(force_cache=force_cache)
            
            if schedule.empty:
                logger.warning(f"No fixtures found for {league_code}")
                return []
            
            # Convertir DataFrame a lista de dicts
            matches = []
            for idx, row in schedule.iterrows():
                try:
                    match = self._transform_fixture(row, league_code, season or self.get_current_season())
                    matches.append(match)
                except Exception as e:
                    logger.error(f"Error transforming fixture: {e}")
                    continue
            
            logger.info(f"Successfully fetched {len(matches)} fixtures")
            return matches
            
        except Exception as e:
            logger.error(f"Error fetching fixtures: {e}")
            raise
    
    def _transform_fixture(self, row, league_code, season):
        """Transforma una fila de DataFrame a formato de partido"""
        
        # Extraer datos con valores por defecto
        home_team = str(row.get('home_team', ''))
        away_team = str(row.get('away_team', ''))
        match_date = row.get('date')
        
        # Determinar estado del partido
        status = self._determine_status(row, match_date)
        
        # Extraer scores (pueden ser None si el partido no ha empezado)
        home_score = None
        away_score = None
        
        if pd.notna(row.get('home_score')):
            home_score = int(row['home_score'])
        if pd.notna(row.get('away_score')):
            away_score = int(row['away_score'])
        
        # Crear ID único del partido
        match_id = f"{league_code}_{season}_{home_team}_{away_team}_{match_date.strftime('%Y%m%d') if pd.notna(match_date) else 'unknown'}"
        match_id = match_id.replace(' ', '_').lower()
        
        return {
            'id': match_id,
            'apiMatchId': match_id,
            'competition': league_code,
            'season': self.format_season_display(season),
            'round': int(row.get('round', 0)) if pd.notna(row.get('round')) else None,
            'date': match_date.isoformat() if pd.notna(match_date) else None,
            'homeTeam': home_team,
            'awayTeam': away_team,
            'homeScore': home_score,
            'awayScore': away_score,
            'status': status,
            'venue': str(row.get('venue', '')) if pd.notna(row.get('venue')) else None,
            'referee': str(row.get('referee', '')) if pd.notna(row.get('referee')) else None,
        }
    
    def _determine_status(self, row, match_date):
        """Determina el estado del partido"""
        # Si tiene scores, está finalizado
        if pd.notna(row.get('home_score')) and pd.notna(row.get('away_score')):
            return 'finished'
        
        # Si no tiene fecha, asumimos scheduled
        if pd.isna(match_date):
            return 'scheduled'
        
        # Comparar con fecha actual
        now = datetime.now()
        
        # Si es hoy, podría estar en vivo
        if match_date.date() == now.date():
            return 'live'
        
        # Si es futuro, scheduled
        if match_date > now:
            return 'scheduled'
        
        # Si es pasado sin scores, podría estar postponed
        return 'postponed'


# Instancia global del servicio
service = SoccerDataService()


# ==================== ENDPOINTS ====================

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'soccer-data-api',
        'version': '1.0.0',
        'cache_dir': service.cache_dir,
        'current_season': service.get_current_season()
    })


@app.route('/api/leagues', methods=['GET'])
def get_leagues():
    """Lista de ligas disponibles"""
    leagues = [
        {
            'code': 'premier-league',
            'name': 'Premier League',
            'country': 'England',
            'icon': '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
        },
        {
            'code': 'la-liga',
            'name': 'La Liga',
            'country': 'Spain',
            'icon': '🇪🇸'
        },
        {
            'code': 'serie-a',
            'name': 'Serie A',
            'country': 'Italy',
            'icon': '🇮🇹'
        },
        {
            'code': 'bundesliga',
            'name': 'Bundesliga',
            'country': 'Germany',
            'icon': '🇩🇪'
        },
        {
            'code': 'ligue-1',
            'name': 'Ligue 1',
            'country': 'France',
            'icon': '🇫🇷'
        }
    ]
    
    return jsonify({
        'leagues': leagues,
        'count': len(leagues),
        'current_season': service.get_current_season()
    })


@app.route('/api/fixtures/<league_code>', methods=['GET'])
def get_fixtures(league_code):
    """
    Obtiene fixtures de una liga
    
    Query params:
        - season: Temporada en formato YYZZ (opcional, default: temporada actual)
        - force_cache: Si 'true', usa caché sin actualizar (opcional)
    """
    try:
        season = request.args.get('season', None)
        force_cache = request.args.get('force_cache', 'false').lower() == 'true'
        
        matches = service.get_fixtures(league_code, season, force_cache)
        
        return jsonify({
            'matches': matches,
            'count': len(matches),
            'league': league_code,
            'season': service.format_season_display(season or service.get_current_season())
        })
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error in get_fixtures endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info(f"🚀 Starting Soccer Data API on port {port}")
    logger.info(f"📁 Cache directory: {service.cache_dir}")
    logger.info(f"⚽ Current season: {service.get_current_season()}")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
