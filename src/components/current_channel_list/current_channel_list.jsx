import React from "react";
import {useSelector} from "react-redux";
import VideoList from "../video_list/video_list";
import "./current_channel_list.scss";


const Current_channel_list = () => {

    const banner = useSelector(state => state.channelsReducer.bannerChannel);
    //console.log('bannerCurrentChannelList', banner);
    return (
        <div>
            <div className="yb-ccl-banner_channel">
                <img className="yb-ccl-banner_channel-img" src={banner} alt=""/>
            </div>

            <VideoList/>
        </div>
    )
};

export default Current_channel_list;