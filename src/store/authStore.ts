import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

interface UserState {
  userProfile: User | null;

  addUser: (user: User) => void;

  removeUser: () => void;
}

const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      userProfile: null,

      addUser: (user) => set({ userProfile: user }),

      removeUser: () => set({ userProfile: null }),
    }),
    { name: "auth" }
  )
);

export default useAuthStore;
