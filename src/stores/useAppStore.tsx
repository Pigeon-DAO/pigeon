import { create } from "zustand";

interface IAppStore {
  loading: boolean;
  setLoading: (audioPlaying: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (title: string) => void;
}

const initialState = {
  loading: false,
  setLoading: (loading: boolean) => {},
  loadingMessage: "",
  setLoadingMessage: (loadingMessage: string) => {},
};

export const useAppStore = create<IAppStore>((set, get) => ({
  ...initialState,
  setLoading: (loading: boolean) => set({ loading }),
  setLoadingMessage: (loadingMessage: string) => set({ loadingMessage }),
}));

// export const useAppStore = create(
//   persist<IAppStore>(
//     (set, get) => ({
//       ...initialState,
//       setLoading: (loading) => set({ loading }),
//     }),
//     {
//       name: "search-storage",
//       getStorage: () => sessionStorage,
//     }
//   )
// );
