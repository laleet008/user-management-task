import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../types/User";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/"
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" }
            ]
          : [{ type: "User", id: "LIST" }]
    }),
    getUser: builder.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }]
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body
      }),
      // Optimistic Update
      async onQueryStarted(user, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            // JSONPlaceholder always returns id 11 for new users, so we mock a random ID for uniqueness in this demo
            const newUser = { ...user, id: Date.now() } as User;
            draft.unshift(newUser);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: patch
      }),
      // Optimistic Update
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            const index = draft.findIndex((user) => user.id === id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...patch };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE"
      }),
      // Optimistic Update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            const index = draft.findIndex((user) => user.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    })
  })
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApi;
