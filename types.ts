export interface JobDescription {
  id: string;
  title: string;
  department: string;
  requirements: string;
  created_at: string;
}

export interface SkillGap {
  missing_skill: string;
  importance: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
  candidate_name: string;
  email: string;
  match_score: number; // 0-100
  summary: string;
  years_of_experience: number;
  education_match: string;
  technical_skills_found: string[];
  soft_skills_found: string[];
  missing_critical_skills: string[];
  recommendation: 'Strong Hire' | 'Hire' | 'Consider' | 'Reject';
}

export interface Candidate {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  analysis?: AnalysisResult;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  JOBS = 'JOBS',
  SCREENING = 'SCREENING',
  CANDIDATE_DETAIL = 'CANDIDATE_DETAIL'
}