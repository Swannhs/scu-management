import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface EstateAdvertiserInterface {
    id: string;
    keyword: string;
    descriptionEn: string;
    descriptionDe: string;
    descriptionFr: string;
    descriptionIt: string;
}

interface EstateAdvertiserState {
    isLoading: boolean;
    data: EstateAdvertiserInterface[];
    error: Object | null;
}

const initialState: EstateAdvertiserState = {
    isLoading: false,
    data: [],
    error: null
};

const slice = createSlice({
    name: 'estateAdvertiser',
    initialState,
    reducers: {
        fetchEstateAdvertiser(state) {
            state.isLoading = true;
        },
        fetchEstateAdvertiserSuccess(state, action: PayloadAction<EstateAdvertiserInterface[]>) {
            state.isLoading = false;
            state.data = action.payload;
        },
        fetchEstateAdvertiserError(state, action: PayloadAction<Object>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default slice.reducer;

export const {
    fetchEstateAdvertiser,
    fetchEstateAdvertiserSuccess,
    fetchEstateAdvertiserError
} = slice.actions;

export const selectEstateAdvertisers = (state: { estateAdvertiser: EstateAdvertiserState }) => state.estateAdvertiser.data;

export const fetchEstateAdvertiserAction = () => async (dispatch: Function) => {
    dispatch(fetchEstateAdvertiser());
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/${process.env.NEXT_PUBLIC_STATIC_SERVICE_PREFIX}/public/v1/estate-advertiser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        dispatch(fetchEstateAdvertiserSuccess(data));
    } catch (error) {
        dispatch(fetchEstateAdvertiserError(error));
    }
}