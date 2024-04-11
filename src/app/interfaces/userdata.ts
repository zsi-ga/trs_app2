export interface UserData {

  id?: string; 
  fullName: string;
  email: string;
  fullClass: string;
  result_tc: number;
  results?: { 
    result_tc: number | null;
    result_sc: number | null;
  };
  scores: number[]; 
}
