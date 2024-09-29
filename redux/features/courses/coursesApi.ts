import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (formData) => ({
        url: "courses/create-course",
        method: "POST",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    getCourses: builder.query({
      query: () => ({
        url: "courses/get-courses",
        method: "GET",
        credentials: "include" as const,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }),
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: "courses/get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    updateCourse: builder.mutation({
      query: (formData) => ({
        url: "courses/update-course",
        method: "POST",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    getTrendingCourses: builder.mutation({
      query: () => ({
        url: "courses/get-trending-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id: any) => ({
        url: `courses/get-course-wop/${id}`,
        method: "GET",
        credentials: "include" as const,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }),
    }),

    getUsersCourse: builder.query({
      query: () => ({
        url: "admin/get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id) => ({
        url: `courses/get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addNewQuestion: builder.mutation({
      query: ({ questionList, courseId, contentId }) => ({
        url: "courses/add-question",
        body: {
          questionList,
          courseId,
          contentId,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),

    addAnswerInQuestion: builder.mutation({
      query: ({ answerList, courseId, contentId, questionId }) => ({
        url: "courses/add-answer",
        body: {
          answerList,
          courseId,
          contentId,
          questionId,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),

    addReview: builder.mutation({
      query: ({ reviewList, courseId }) => ({
        url: "courses/add-review",
        body: {
          reviewList,
          courseId,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),

    editReview: builder.mutation({
      query: ({ reviewId, updatedReview, courseId }) => ({
        url: `courses/edit-review/${reviewId}`,
        body: {
          updatedReview,
          courseId,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
     }),

    searchCourse: builder.mutation({
      query: ({ keyword, signal }) => ({
        url: `courses/search-courses`,
        params: {
          term: keyword,
        },
        method: "GET",
        credentials: "include" as const,
        signal: signal,
      }),
    }),

    getUserCourses: builder.query({
      query: () => ({
        url: "courses/get-user-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetTrendingCoursesMutation,
  useGetCourseDetailsQuery,
  useGetUsersCourseQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewMutation,
  useSearchCourseMutation,
  useEditReviewMutation,
  useGetUserCoursesQuery,
  
} = coursesApi;