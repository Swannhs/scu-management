import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getEstateById, getRecentListings} from "@/api/estatePublicApi";
import {EstateInterface, EstateSingleInterface} from "@/types/property";

export interface EstatePublicState {
    listings: EstateInterface[];
    selectedEstate?: EstateSingleInterface | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error?: string;
}

const initialState: EstatePublicState = {
    listings: [],
    selectedEstate: null,
    status: "idle",
};

export const fetchRecentListings = createAsyncThunk("estatePublic/fetchRecentListings", async () => {
    return await getRecentListings();
});

export const fetchEstateById = createAsyncThunk("estatePublic/fetchEstateById", async (id: string) => {
    return await getEstateById(id);
});

const estatePublicSlice = createSlice({
    name: "estatePublic",
    initialState,
    reducers: {
        clearSelectedEstate(state) {
            state.selectedEstate = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRecentListings.pending, state => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(fetchRecentListings.fulfilled, (state, action: PayloadAction<EstateInterface[]>) => {
                state.listings = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchRecentListings.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchEstateById.pending, state => {
                state.status = "loading";
            })
            .addCase(fetchEstateById.fulfilled, (state, action: PayloadAction<EstateSingleInterface>) => {
                state.selectedEstate = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchEstateById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const {clearSelectedEstate} = estatePublicSlice.actions;

export const selectRecentListings = (state: { estatePublic: EstatePublicState }) => state.estatePublic.listings;
export const selectEstateStatus = (state: { estatePublic: EstatePublicState }) => state.estatePublic.status;
export const selectEstateError = (state: { estatePublic: EstatePublicState }) => state.estatePublic.error;

export default estatePublicSlice.reducer;
