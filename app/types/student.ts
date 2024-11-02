export interface Student {
  name: string;
  email: string;
  profile_url: string;
  badges_count: number;
  incomplete_assignments_count: number;
  completed_assignments_count: number;
  badges: string[] | null;
  incomplete_assignments: string[] | null;
  completed_assignments: string[] | null;
}
