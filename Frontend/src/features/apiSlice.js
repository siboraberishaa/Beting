import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ''}),
  endpoints: (builder) => ({
    getInPlayFilter: builder.query({  
      query: () => ({
        url: 'https://bet365-api-inplay.p.rapidapi.com/bet365/get_sports',
        headers: {
          'X-RapidAPI-Key': '81809c1df7mshc6913b0d43ef401p144d4bjsn30dbd506d52c',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getInPlayOdss: builder.query({
      query: () => ({
        url: 'https://bet365-api-inplay.p.rapidapi.com/bet365/get_sport_events/cricket',  
        headers: {
          'X-RapidAPI-Key': '81809c1df7mshc6913b0d43ef401p144d4bjsn30dbd506d52c',
          'X-RapidAPI-Host': 'bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
    getOddsPerGame: builder.query({
      query: (eventId) => ({
        url: `https://bet365-api-inplay.p.rapidapi.com/bet365/get_event_with_markets/${eventId}`,  
        headers: {
          'X-RapidAPI-Key': '81809c1df7mshc6913b0d43ef401p144d4bjsn30dbd506d52c',
          'X-RapidAPI-Host': ' bet365-api-inplay.p.rapidapi.com'
        },
      }),
    }),
      
  }),
});

export const { useGetInPlayFilterQuery, useGetInPlayOdssQuery, useGetOddsPerGameQuery } = apiSlice;

