import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null, // This property specifies the currently open modal type (e.g., "register" or "login").
  toggle: (modalType) => set((state) => ({ isOpen: !state.isOpen, modalType })),
}));

export default useModalStore;