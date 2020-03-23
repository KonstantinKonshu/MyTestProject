
export const  handleSubmit = (termFromSearchBar, channelId, isOpenChannel) => {
    console.log("termAction",  termFromSearchBar);
    return{
        type: "HANDLE_SUBMIT",
        payload1: termFromSearchBar,
        payload2: channelId,
        payload3: isOpenChannel
    }
};

export const getRequest = (response) => {
    //console.log("REQ", response)
    return{
        type: "GET_REQUEST",
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


