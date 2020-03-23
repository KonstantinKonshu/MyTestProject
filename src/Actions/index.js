
export const  handleSubmitInit = (termFromSearchBar, channelId) => {
    console.log("termAction",  termFromSearchBar);
    return{
        type: "HANDLE_SUBMIT_INIT",
        payload1: termFromSearchBar,
        payload2: channelId
    }
};

export const getRequestSearch = response => {
    return{
        type: "GET_REQUEST_SEARCH",
        payload: response
    }
}

export const getRequestVideos = response => {
    return{
        type: "GET_REQUEST_VIDEOS",
        payload: response
    }
}

export const getRequestChannels = response =>{
    return{
        type: "GET_REQUEST_CHANNELS",
        payload: response
    }
}

export const handleSelectVideo = (videoSelect) => {
    console.log("handleSelectVideo_ACTIONS");
    return{
        type: "SELECT_VIDEO",
        payload: videoSelect
    }
}


