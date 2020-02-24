import React from "react";
import VideoItem from "../VideoItem";
import PlayerYoutube from "../PlayerYoutube";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
const qs = require('query-string');


const VideoList = (props) => {
    const { videos, handleVideoSelect, isOpenModal,  selectedVideo, search} = props;
    console.log("videolist--", props);
    const renderedVideos = videos.map((video) => {

            if (isOpenModal && video === selectedVideo) {
                return (
                    // <PlayerYoutube video={selectedVideo}/>
                    <Route path={`/videolist`} component={PlayerYoutube}/>
                )
            } else {
                return (
                    <Link to={`/videolist?search=${search}&id=${video.id.videoId}`}>
                        <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect}/>
                    </Link>
                )

            }
        }
    )

    return(
        <div>
            {/*<Switch>*/}
                {renderedVideos}
            {/*</Switch>*/}
        </div>
    )
}




export default VideoList