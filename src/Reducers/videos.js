const initialState = {
    videos: [],
    selectedVideo: null,
    search: null
};


export  default function (state =initialState, action){

    switch (action.type) {

        case "SET_SELECT_VIDEO":
            console.log(action.payload);
            return {
                ...state,
                selectedVideo: action.payload
            }
        case "GET_REQUEST_SEARCH":
            return {
                ...state,
                videos: action.payload.items,

            }
        case "HANDLE_SUBMIT_INIT":
            return {
                ...state,
                search: action.payload1
            };

        case "SELECT_CHANNEL":
            return {
                ...state,
                selectedVideo: action.payload,
            }

        default:
            return state;
    }
}
