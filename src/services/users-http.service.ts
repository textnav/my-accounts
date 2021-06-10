import { UserProfile } from "../redux/user/user.reducer";
import { http } from "./http";

export const getUserProfile = () => {
  return http.get<UserProfile>(`/profile`);
};
