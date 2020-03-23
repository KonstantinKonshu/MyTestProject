const initialState = {
    nextPageToken: null,
    prevPageToken: null,
    pageToken: null,
};

export default function (state =initialState, action){

    switch (action.type) {
        case "GET_REQUEST_SEARCH":
            console.log("REQ",action.payload)
            return {
                ...state,
                nextPageToken: action.payload.data.nextPageToken,
                prevPageToken: action.payload.data.prevPageToken
            }

        default:
            return state;
    }
}
