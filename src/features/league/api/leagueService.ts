import axios from "axios";
import type {
  CreateLeagueData,
  CreateLeagueResponse,
  League,
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
    inviteCode: string
  ): Promise<{ message: string; league: League }> {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/join`,
      { inviteCode },
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
