import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    matches: [],
};

export const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        addToMatches: (state, action) => {
            state.matches = [...state.matches, action.payload];
        },
        removeFromMatches: (state, action) => {
            const index = state.matches.findIndex(
                (match) => match.id === action.payload.id
            );

        let newMatch = [...state.matches];

        if (index >= 0) {
            newMatch.splice(index, 1);
        } else {
            console.warn(
            `Cant delete match (id: ${action.payload.id})`
            );
        }

        state.matches = newMatch;
        },
        setMatches: (state, action) => {
            const updatedMatches = action.payload;

            // Add or update matches based on the payload
            updatedMatches.forEach((updatedMatch) => {
                const existingMatchIndex = state.matches.findIndex(
                    (match) => match.id === updatedMatch.id
                );
                if (existingMatchIndex !== -1) {
                    // Match already exists, update it
                    state.matches[existingMatchIndex] = updatedMatch;
                }     else {
                    // Match doesn't exist, add it
                    state.matches.push(updatedMatch);
                }
                });
                // Remove matches that no longer exist in the payload
                state.matches = state.matches.filter((match) => {
                const existingMatch = updatedMatches.find(
                    (updatedMatch) => updatedMatch.id === match.id
                );
                return !!existingMatch;
                });
                console.log(updatedMatches.length)
            },
    },
});

export const { addToMatches, removeFromMatches, setMatches  } = matchSlice.actions;

export const selectMatches = (state) => state.match.matches;

export const selectMatchesWithId = (state, id) =>
    state.match.matches.filter((match) => match.id === id);

export default matchSlice.reducer;