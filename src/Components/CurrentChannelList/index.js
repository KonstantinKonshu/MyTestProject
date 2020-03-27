import React from "react";
import {useSelector} from "react-redux";
import VideoList from "../VideoList";
import "./style.css";
import channels from "../../Reducers/channels";

const qs = require('query-string');

const CurrentChannelList = () => {

    const banner = useSelector(state => state.channels.bannerChannel);
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

export default CurrentChannelList;