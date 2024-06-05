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
          'X-RapidAPI-Key': '54aae3458cmsh0f4b5766b4d3af4p17ae72jsne4257d8ac39e',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getInPlayOdss: builder.query({
      query: (sport) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_sport_events/${sport}`,  
        headers: {
          'X-RapidAPI-Key': '54aae3458cmsh0f4b5766b4d3af4p17ae72jsne4257d8ac39e',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getOddsPerGame: builder.query({
      query: (eventId) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_event_with_markets/${eventId}`,  
        headers: {
          'X-RapidAPI-Key': '54aae3458cmsh0f4b5766b4d3af4p17ae72jsne4257d8ac39e',
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
    query: () => ({
      url: `http://localhost:5000/api/users/all`,
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
        url: `http://localhost:5000/api/roles`,
    }),
    providesTags: ['Roles'],
    keepUnusedDataFor: 5
}),
      
  }),
});

export const { useGetInPlayFilterQuery, useGetInPlayOdssQuery, useGetOddsPerGameQuery, useLoginMutation, useGetUserProfileQuery, useGetAllUsersQuery, useRegisterUserMutation, useGetRolesQuery } = apiSlice;

