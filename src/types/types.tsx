export type ScoreDataType = {
  scoresByCategory: {
    design: number;
    marketing: number;
    ux: number;
    seo: number;
    performance: number;
    technique: number;
    legal: number;
  };
  globalScore: number;
};

export type ContactFormType = {
  email: string;
  firstName: string;
  lastName: string;
  url: string;
  scores: ScoreDataType;
};

export type FormValuesType = {
  [key: string]: string | number | boolean;
};
