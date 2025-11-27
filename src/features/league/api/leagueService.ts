import axios from "axios";
import type {
  CreateLeagueData,
  CreateLeagueResponse,
  League,
  LeagueStanding,
  Match,
  Prediction,
  CreatePredictionData,
} from "../types/league.types";
import { config } from "../../../config/env";

const API_URL = `${config.apiUrl}/api/leagues`;

class LeagueService {
  async createLeague(data: CreateLeagueData): Promise<CreateLeagueResponse> {
    const token = localStorage.getItem("token");

    const response = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async getLeague(id: string): Promise<League> {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async getUserLeagues(): Promise<League[]> {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/my-leagues`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async joinLeague(
    inviteCode: string,
    teamName: string
  ): Promise<{ message: string; league: League }> {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/join`,
      { inviteCode, teamName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  async getLeagueStandings(leagueId: string): Promise<LeagueStanding[]> {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/${leagueId}/standings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async getLeagueMatches(leagueId: string): Promise<Match[]> {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/${leagueId}/matches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async getUserPredictions(leagueId: string): Promise<Prediction[]> {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/${leagueId}/my-predictions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createPrediction(
    leagueId: string,
    data: CreatePredictionData
  ): Promise<Prediction> {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/${leagueId}/predictions`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  async updatePrediction(
    leagueId: string,
    predictionId: string,
    data: CreatePredictionData
  ): Promise<Prediction> {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/${leagueId}/predictions/${predictionId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
}

export default new LeagueService();
