export interface UserModel {
  id: number;
  username: string;
  email: string;
  userType: 'Mentee' | 'Mentor';
}
