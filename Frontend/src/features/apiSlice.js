import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ''}),
  tagTypes: ['Roles',],
  endpoints: (builder) => ({
    getInPlayFilter: builder.query({  
      query: () => ({
        url: 'https://bet365-api-inplay.p.rapidapi.com/bet365/get_sports',
        headers: {
          'X-RapidAPI-Key': 'b257ce1b5fmsh45c65f391861a25p1cd103jsneae8f4edf029',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getInPlayOdss: builder.query({
      query: (sport) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_sport_events/${sport}`,  
        headers: {
          'X-RapidAPI-Key': 'b257ce1b5fmsh45c65f391861a25p1cd103jsneae8f4edf029',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getOddsPerGame: builder.query({
      query: (eventId) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_event_with_markets/${eventId}`,  
        headers: {
          'X-RapidAPI-Key': 'b257ce1b5fmsh45c65f391861a25p1cd103jsneae8f4edf029',
          'X-RapidAPI-Host': ' bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `https://beting.onrender.com/api/users/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
  }),
  getUserProfile: builder.query({
    query: ({ userId }) => ({
      url: `https://beting.onrender.com/api/users/profile/${userId}`,
      method: 'GET',
      // credentials: 'include',
    }),
    keepUnusedDataFor: 5,
  }),
  getAllUsers: builder.query({
    query: ({userId, isAdmin, isAgent}) => ({
      url: `https://beting.onrender.com/api/users/get/${userId}?isAdmin=${isAdmin}&isAgent=${isAgent}`,
      method: 'GET',
      credentials: 'include',
    }),
    keepUnusedDataFor: 5,
  }),  
  registerUser: builder.mutation({
    query: (data) => ({
      url: `https://beting.onrender.com/api/users/register`,
      method: 'POST',
      body: data,
      credentials: 'include',
    }),
  }),
  getRoles: builder.query({
    query: () => ({
        url: `https://beting.onrender.com/api/roles/get`,
    }),
    method: 'GET',
    credentials: 'include',
    keepUnusedDataFor: 5
}),
  getRolesForManager: builder.query({
    query: () => ({
        url: `https://beting.onrender.com/api/roles/get/manager`,
    }),
    method: 'GET',
    credentials: 'include',
    keepUnusedDataFor: 5
}),
  getRolesForAgent: builder.query({
    query: () => ({
        url: `https://beting.onrender.com/api/roles/get/agent`,
    }),
    method: 'GET',
    credentials: 'include',
    keepUnusedDataFor: 5
}),
createTicket: builder.mutation({
  query: (data) => ({
    url: `https://beting.onrender.com/api/tickets`,
    method: 'POST',
    body: data,
    credentials: 'include',
  }),
}),
getAllTickets: builder.query({
  query: ({userId, isAdmin, isAgent}) => ({
    url: `https://beting.onrender.com/api/tickets/${userId}?isAdmin=${isAdmin}&isAgent=${isAgent}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
getUserById: builder.query({
  query: (userId) => ({
    url: `https://beting.onrender.com/api/users/${userId}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
createTransfer: builder.mutation({
  query: (data) => ({
    url: `https://beting.onrender.com/api/transfers`,
    method: 'POST',
    body: data,
    credentials: 'include',
  }),
}),
getAllTransfers: builder.query({
  query: () => ({
    url: `https://beting.onrender.com/api/transfers`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
editUsersUserName: builder.mutation({
  query: (data) => ({
    url: `https://beting.onrender.com/api/users/userName/${data.userId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),
editUsersDescription: builder.mutation({
  query: (data) => ({
    url: `https://beting.onrender.com/api/users/description/${data.userId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),
editUsersCommission: builder.mutation({
  query: (data) => ({
    url: `https://beting.onrender.com/api/users/commission/${data.userId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),
updateUsersStatus: builder.mutation({
  query: ({ userId, status }) => ({
      url: `https://beting.onrender.com/api/users/status/${userId}`,
      method: 'PUT',
      credentials: 'include',
      body: { status },
  }),
}),
createRole: builder.mutation({
  query: (data) => ({
    url: `https://beting.onrender.com/api/roles`,
    method: 'POST',
    credentials: 'include',
    body: data
  }),
  invalidatesTags: ['Roles'],
}),
getRoleDetails: builder.query({
  query: (roleId) => ({
    url: `https://beting.onrender.com/api/roles/${roleId}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
updateRole: builder.mutation({
  query: ({ roleId, data }) => ({
    url: `https://beting.onrender.com/api/roles/${roleId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
  invalidatesTags: ['Roles'],
}),
logout: builder.mutation({
  query: () => ({
    url: `https://beting.onrender.com/api/users/logout`,
    method: 'POST',
    credentials: 'include'
  }),
}),
password: builder.mutation({
  query: (data) => ({
    url: `https://beting.onrender.com/api/users/password`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),
getAllFinances: builder.query({
  query: ({userId, isAdmin, isAgent}) => ({
    url: `https://beting.onrender.com/api/finances/${userId}?isAdmin=${isAdmin}&isAgent=${isAgent}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),

      
  }),
});

export const { useGetInPlayFilterQuery, useGetInPlayOdssQuery, useGetOddsPerGameQuery, useLoginMutation, useGetUserProfileQuery, useGetAllUsersQuery, useRegisterUserMutation, useGetRolesQuery, useGetRolesForAgentQuery, useGetRolesForManagerQuery, useCreateTicketMutation, useGetAllTicketsQuery, useGetUserByIdQuery, useCreateTransferMutation, useGetAllTransfersQuery, useEditUsersUserNameMutation, useEditUsersDescriptionMutation, useUpdateUsersStatusMutation, useCreateRoleMutation, useGetRoleDetailsQuery, useUpdateRoleMutation, useLogoutMutation, usePasswordMutation, useEditUsersCommissionMutation, useGetAllFinancesQuery } = apiSlice;

