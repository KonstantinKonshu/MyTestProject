import {types} from "../Constants";

export const  handleSubmitInit = (termFromSearchBar, initialItem) => {
    return{
        type: types.HANDLE_SUBMIT_INIT,
        payload1: termFromSearchBar,
        payload2: initialItem,
        payload3: false
    }
};

export const getRequestSearch = data => {
    return{
        type: types.get.GET_REQUEST_SEARCH,
        payload: data
    }
}

export const getBannerChannels = bannerChannel =>{
    return{
        type: types.get.GET_BANNER_CHANNELS,
        payload: bannerChannel
    }
}

export const handleClickVideo = videoSelect => {
    return{
        type: types.set.SET_SELECT_VIDEO,
        payload: videoSelect

    }
}

export const handleClickChannel = channel =>{
    return{
        type: types.SELECT_CHANNEL,
        payload: channel
    }
}

export const setError = error => {
    return{
        type: types.set.SET_ERROR,
        payload: error
    }
}

