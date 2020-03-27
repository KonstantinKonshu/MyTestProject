
export const  handleSubmitInit = (termFromSearchBar, channelId, bannerChannel) => {
    console.log("termAction",  termFromSearchBar);
    return{
        type: "HANDLE_SUBMIT_INIT",
        payload1: termFromSearchBar,
        payload2: channelId,
        payload3: bannerChannel
    }
};

export const getRequestSearch = data => {
    return{
        type: "GET_REQUEST_SEARCH",
        payload: data
    }
}

// export const getRequestVideos = response => {
//     return{
//         type: "GET_REQUEST_VIDEOS",
//         payload: response
//     }
// }

export const getBannerChannels = bannerChannel =>{
    return{
        type: "GET_BANNER_CHANNELS",
        payload: bannerChannel
    }
}

export const handleClickVideo = videoSelect => {
   // console.log("handleSelectVideo_ACTIONS");
    return{
        type: "SET_SELECT_VIDEO",
        payload: videoSelect

    }
}

export const handleClickChannel = channel =>{
    return{
        type: "SELECT_CHANNEL",
        payload: channel
    }
}


