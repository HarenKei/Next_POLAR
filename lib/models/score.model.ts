// 점수 단일 객체
export interface Score {
  nickname: string;
  categoryId: number;
  season: number;
  categoryScore: number;
  updatedAt: string;
}

// 카테고리 정보 포함 점수
export interface ScoreWithCategory extends Score {
  category: {
    id: number;
    name: string;
    point: number;
  };
}

// 랭킹 정보 (예: 시즌별 랭킹)
export interface ScoreRanking {
  nickname: string;
  totalScore: number;
  rank: number;
}

// 필요시 시즌 관련 확장 타입을 여기에 추가하세요.
