import { API_ENDPOINTS } from '../constants/api';
import apiClient from '../http.api';
import { Score, ScoreWithCategory, ScoreRanking } from '../models/score.model';

// 사용자 전체 점수 조회
export const getUserScores = async (nickname: string) => {
  const response = await apiClient.get<Score[]>(
    `${API_ENDPOINTS.USER_SCORES}?nickname=${nickname}`
  );
  return response.data;
};

// 카테고리별 사용자 점수 조회
export const getUserScoresByCategory = async (nickname: string, categoryId: number) => {
  const response = await apiClient.get<ScoreWithCategory[]>(
    `${API_ENDPOINTS.USER_CATEGORY_SCORES}?categoryId=${categoryId}`
  );
  return response.data;
};

// 시즌별 사용자 점수 조회
export const getUserScoresBySeason = async (nickname: string, season: number) => {
  const response = await apiClient.get<Score[]>(
    `${API_ENDPOINTS.USER_SEASON_SCORES}?nickname=${nickname}&season=${season}`
  );
  return response.data;
};

// 카테고리+시즌별 점수 조회
export const getUserScoresByCategoryAndSeason = async (categoryId: number, season: number) => {
  const response = await apiClient.get<ScoreWithCategory[]>(
    `${API_ENDPOINTS.CATEGORY_SEASON_SCORES}?categoryId=${categoryId}&season=${season}`
  );
  return response.data;
};

// 시즌별 랭킹 조회
export const getSeasonScoreRanking = async (season: number) => {
  const response = await apiClient.get<ScoreRanking[]>(
    `${API_ENDPOINTS.SEASON_SCORES}?season=${season}`
  );
  return response.data;
};

