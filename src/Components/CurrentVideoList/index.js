import React from "react";
import PlayerYoutube from "../PlayerYoutube";
import VideoList from "../VideoList";
import "./style.css";
const qs = require('query-string');

const CurrentVideoList = (props) => {

    const {history, videos, selectedVideo, handleVideoSelect, isOpenChannel} = props;
    console.log('CurrentVideo', props);
    const  s = qs.parse(history.location.search);
    let identif;
    if(s["id"]===undefined && selectedVideo!==null)
        identif = selectedVideo.id.videoId;
    else
        identif = s["id"];

    return (
        <div className="container">
            <div className="row">
                <div className="col-2-3">
                    <h1>CurrentList</h1>

                    <PlayerYoutube id={identif}/*selectedVideo={selectedVideo}*//>
                    {/*<div>*/}
                    {/*    <h4>*/}
                    {/*        {selectedVideo.snippet.title}*/}
                    {/*    </h4>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h5>*/}
                    {/*        {selectedVideo.snippet.channelTitle}*/}
                    {/*    </h5>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h6>*/}
                    {/*        {selectedVideo.snippet.description}*/}
                    {/*    </h6>*/}
                    {/*</div>*/}

                </div>
                <div className="col-1-3">
                    //videoList
                    <VideoList handleVideoSelect={handleVideoSelect} videos={videos}
                               selectedVideo = {selectedVideo} history={history} isOpenChannel={isOpenChannel}
                    />
                </div>
            </div>


        </div>
    )
};

export default CurrentVideoList;