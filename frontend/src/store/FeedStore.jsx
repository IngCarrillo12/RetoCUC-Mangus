import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchFeedbacks, postFeedback } from "../api/FeedApi.jsx";

export const useFeedbackStore = create(
  persist(
    (set) => ({
      feedbacks: [],
      loading: false,
      error: null,

      loadFeedbacks: async (cursoId) => {
        set({ loading: true, error: null });
        try {
          const feedbacks = await fetchFeedbacks(cursoId);
          set({ feedbacks, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      sendFeedback: async (curso_id, admin_id, comentario) => {
        set({ loading: true, error: null });
        try {
          const data = await postFeedback(curso_id, admin_id, comentario);
          set({ feedbacks: data.feedbacks, loading: false });
          return data.message;
        } catch (error) {
          set({ error: error.message, loading: false });
          return error.message;
        }
      },
    }),
    {
      name: "feedback-storage",
    }
  )
);
