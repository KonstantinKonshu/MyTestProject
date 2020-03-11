import React from "react";
import VideoList from "../VideoList";
import CurrentVideoList from "../CurrentVideoList";
import {Route} from "react-router-dom";
// import PlayerYoutube from "../PlayerYoutube";
// import VideoList from "../VideoList";
const qs = require('query-string');

const CurrentChannelList = (props) => {

    const {history, videos, selectedVideo, handleVideoSelect, isOpenChannel} = props;
    console.log('CurrentChannel', props);


    return (
        <div className="container">
            <h1>hello</h1>
            <VideoList handleVideoSelect={handleVideoSelect} videos={videos}
                       selectedVideo = {selectedVideo} history={history} isOpenChannel={isOpenChannel}
            />
        </div>

    )
};

export default CurrentChannelList;