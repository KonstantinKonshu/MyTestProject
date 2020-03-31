import React from "react";
import {useSelector} from "react-redux";
import VideoList from "../video_list/video_list";
import "./current_channel_list.scss";


const Current_channel_list = () => {

    const banner = useSelector(state => state.channelsReducer.bannerChannel);
    console.log('bannerCurrentChannelList', banner);
    return (
        <div>
            <div className="bannerChannel">
                <img className="img_banner" src={banner} alt=""/>
            </div>

            <VideoList/>
        </div>
    )
};

export default Current_channel_list;