import React from "react";
import VideoItem from "../VideoItem";
import PlayerYoutube from "../PlayerYoutube";
import {Route, Link} from "react-router-dom";
const qs = require('query-string');


const VideoList = (props) => {
    const { videos, handleVideoSelect, isOpenModal,  selectedVideo, search, isOpenChannel} = props;
    console.log("videolist--", props);
    const renderedVideos = videos.map((video, index) => {
            console.log('video',video);

            let urlq;
            if(video.id.kind==="youtube#video"){
                if(isOpenChannel)
                    urlq = `/videolist?search=${search}&ChannelId=${video.snippet.channelId}&videoId=${video.id.videoId}`;
                else
                    urlq = `/videolist?search=${search}&id=${video.id.videoId}`;
            }
            else{
                urlq = `/videolist?search=${search}&ChannelId=${video.snippet.channelId}`;
            }

            if (isOpenModal && video === selectedVideo) {
                return (
                    <Route path={`/videolist`} component={PlayerYoutube}/>
                )
            } else {
                // if(video.id.kind==="youtube#video"){
                //     // console.log(video);
                //     if(isOpenChannel){
                //         console.log('videoChannel');
                //         return (
                //             <Link key={`VideoList_${index}`} to={`/videolist?search=${search}&ChannelId=${video.snippet.channelId}&videoId=${video.id.videoId}`}>
                //                 <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect}/>
                //             </Link>
                //         )
                //     }
                //     else {
                //         console.log('videoChannelNO');
                        return (
                            <Link key={`VideoList_${index}`} to={urlq}>
                                <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect}/>
                            </Link>
                        )
                //     }
                //
                // }
                // else{
                //     //if channel
                //     console.log('CHANNEL');
                //     return (
                //         <Link key={`VideoList_${index}`} to={`/videolist?search=${search}&ChannelId=${video.snippet.channelId}`}>
                //             <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect}/>
                //         </Link>
                //     )
                // }

            }
        }
    )

    return(
        <div>
            {renderedVideos}
        </div>
    )
}

export default VideoList