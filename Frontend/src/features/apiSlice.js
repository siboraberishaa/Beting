import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ''}),
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  tagTypes: ['Roles',],
  endpoints: (builder) => ({
    getInPlayFilter: builder.query({  
      query: () => ({
        url: 'https://bet365-api-inplay.p.rapidapi.com/bet365/get_sports',
        headers: {
          'X-RapidAPI-Key': '4722285c81mshf6c6bf5e879ddbcp1e0e6ejsn2ca812780af1',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com' 
        },
      }),
    }),
    getInPlayOdss: builder.query({
      query: (sport) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_sport_events/${sport}`,  
        headers: {
          'X-RapidAPI-Key': '4722285c81mshf6c6bf5e879ddbcp1e0e6ejsn2ca812780af1',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getOddsPerGame: builder.query({
      query: (eventId) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_event_with_markets/${eventId}`,  
        headers: {
          'X-RapidAPI-Key': '4722285c81mshf6c6bf5e879ddbcp1e0e6ejsn2ca812780af1',
          'X-RapidAPI-Host': ' bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `http://localhost:5000/api/users/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
  }),
  getUserProfile: builder.query({
    query: ({ userId }) => ({
      url: `http://localhost:5000/api/users/profile/${userId}`,
      method: 'GET',
      credentials: 'include',
    }),
    keepUnusedDataFor: 5,
  }),
  getAllUsers: builder.query({
    query: ({userId, isAdmin}) => ({
      url: `http://localhost:5000/api/users/get/${userId}?isAdmin=${isAdmin}`,
      method: 'GET',
      credentials: 'include',
    }),
    keepUnusedDataFor: 5,
  }),  
  getUsersList: builder.query({
    query: ({userId, isAdmin}) => ({
      url: `http://localhost:5000/api/users/list/${userId}?isAdmin=${isAdmin}`,
      method: 'GET',
      credentials: 'include',
    }),
    keepUnusedDataFor: 5,
  }),  
  registerUser: builder.mutation({
    query: (data) => ({
      url: `http://localhost:5000/api/users/register`,
      method: 'POST',
      body: data,
      credentials: 'include',
    }),
  }),
  getRoles: builder.query({
    query: () => ({
        url: `http://localhost:5000/api/roles/get`,
    }),
    method: 'GET',
    credentials: 'include',
    keepUnusedDataFor: 5
}),
  getRolesForManager: builder.query({
    query: () => ({
        url: `http://localhost:5000/api/roles/get/manager`,
    }),
    method: 'GET',
    credentials: 'include',
    keepUnusedDataFor: 5
}),
  getRolesForAgent: builder.query({
    query: () => ({
        url: `http://localhost:5000/api/roles/get/agent`,
    }),
    method: 'GET',
    credentials: 'include',
    keepUnusedDataFor: 5
}),
createTicket: builder.mutation({
  query: (data) => ({
    url: `http://localhost:5000/api/tickets`,
    method: 'POST',
    body: data,
    credentials: 'include',
  }),
}),
getAllTickets: builder.query({
  query: ({userId, isAdmin, isAgent}) => ({
    url: `http://localhost:5000/api/tickets/${userId}?isAdmin=${isAdmin}&isAgent=${isAgent}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
getUserById: builder.query({
  query: (userId) => ({
    url: `http://localhost:5000/api/users/${userId}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
createTransfer: builder.mutation({
  query: (data) => ({
    url: `http://localhost:5000/api/transfers`,
    method: 'POST',
    body: data,
    credentials: 'include',
  }),
}),
getAllTransfers: builder.query({
  query: ({ userId, isAdmin }) => ({
    url: `http://localhost:5000/api/transfers/${userId}?isAdmin=${isAdmin}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
editUsersUserName: builder.mutation({
  query: (data) => ({
    url: `http://localhost:5000/api/users/userName/${data.userId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),
editUsersDescription: builder.mutation({
  query: (data) => ({
    url: `http://localhost:5000/api/users/description/${data.userId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),
editUsersCommission: builder.mutation({
  query: (data) => ({
    url: `http://localhost:5000/api/users/commission/${data.userId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),
updateUsersStatus: builder.mutation({
  query: ({ userId, status }) => ({
      url: `http://localhost:5000/api/users/status/${userId}`,
      method: 'PUT',
      credentials: 'include',
      body: { status },
  }),
}),
createRole: builder.mutation({
  query: (data) => ({
    url: `http://localhost:5000/api/roles`,
    method: 'POST',
    credentials: 'include',
    body: data
  }),
  invalidatesTags: ['Roles'],
}),
getRoleDetails: builder.query({
  query: (roleId) => ({
    url: `http://localhost:5000/api/roles/${roleId}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
updateRole: builder.mutation({
  query: ({ roleId, data }) => ({
    url: `http://localhost:5000/api/roles/${roleId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
  invalidatesTags: ['Roles'],
}),
logout: builder.mutation({
  query: () => ({
    url: `http://localhost:5000/api/users/logout`,
    method: 'POST',
    credentials: 'include'
  }),
}),
password: builder.mutation({
  query: (data) => ({
    url: `http://localhost:5000/api/users/password`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),
getAllFinances: builder.query({
  query: ({userId, isAdmin}) => ({
    url: `http://localhost:5000/api/finances/${userId}?isAdmin=${isAdmin}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
updateTicketHasWon: builder.mutation({
  query: ({ ticketId, gameId, hasWon }) => ({
      url: `http://localhost:5000/api/tickets/${ticketId}/games/${gameId}`,
      method: 'POST',
      credentials: 'include',
      body: { hasWon },
  }),
}),
updateUser: builder.mutation({
  query: (data) => ({
    url: `http://localhost:5000/api/users/update/${data.userId}`,
    method: 'PUT',
    credentials: 'include',
    body: data,
  }),
}),

getAllCommissions: builder.query({
  query: () => ({
    url: `http://localhost:5000/api/commissions`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),
getCommissionsByUserId: builder.query({
  query: (userId) => ({
    url: `http://localhost:5000/api/commissions/${userId}`,
    method: 'GET',
    credentials: 'include',
  }),
  keepUnusedDataFor: 5,
}),

      
  }),
});

export const { useGetInPlayFilterQuery, useUpdateUserMutation, useGetInPlayOdssQuery, useGetOddsPerGameQuery, useLoginMutation, useGetUserProfileQuery, useGetAllUsersQuery, useRegisterUserMutation, useGetRolesQuery, useGetRolesForAgentQuery, useGetRolesForManagerQuery, useCreateTicketMutation, useGetAllTicketsQuery, useGetUserByIdQuery, useCreateTransferMutation, useGetAllTransfersQuery, useEditUsersUserNameMutation, useEditUsersDescriptionMutation, useUpdateUsersStatusMutation, useCreateRoleMutation, useGetRoleDetailsQuery, useUpdateRoleMutation, useLogoutMutation, usePasswordMutation, useEditUsersCommissionMutation, useGetAllFinancesQuery, useGetUsersListQuery, useUpdateTicketHasWonMutation, useGetAllCommissionsQuery, useGetCommissionsByUserIdQuery } = apiSlice;

