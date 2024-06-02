import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ''}),
  endpoints: (builder) => ({
    getInPlayFilter: builder.query({  
      query: () => ({
        url: 'https://bet365-api-inplay.p.rapidapi.com/bet365/get_sports',
        headers: {
          'X-RapidAPI-Key': '0a1732f5efmshb425d8b87e4606fp19466ajsn7a5ac2b6d89e',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getInPlayOdss: builder.query({
      query: (sport) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_sport_events/${sport}`,  
        headers: {
          'X-RapidAPI-Key': '0a1732f5efmshb425d8b87e4606fp19466ajsn7a5ac2b6d89e',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getOddsPerGame: builder.query({
      query: (eventId) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_event_with_markets/${eventId}`,  
        headers: {
          'X-RapidAPI-Key': '0a1732f5efmshb425d8b87e4606fp19466ajsn7a5ac2b6d89e',
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
      
  }),
});

export const { useGetInPlayFilterQuery, useGetInPlayOdssQuery, useGetOddsPerGameQuery, useLoginMutation } = apiSlice;

