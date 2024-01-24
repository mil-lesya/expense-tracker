export interface UserJwtResponse {
  user: {
    id: string;
    username: string;
    email: string;
  }
  accessToken: string;
}