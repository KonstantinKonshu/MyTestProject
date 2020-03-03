import React from "react";
import VideoItem from "../VideoItem";
import PlayerYoutube from "../PlayerYoutube";
import {Route, Link} from "react-router-dom";
const qs = require('query-string');


const VideoList = (props) => {
    const { videos, handleVideoSelect, selectedVideo, search, isOpenChannel, history} = props;
    console.log("videolist--", props);
    console.log("videolist-History", history);

    const renderedVideos = videos.map((video, index) => {
          if(video===selectedVideo){

          }else{
              let urlq;
              if(video.id.kind==="youtube#video"){
                  if(isOpenChannel)
                      urlq = `/videolist?search=${search}&ChannelId=${video.snippet.channelId}&id=${video.id.videoId}`;
                  else
                      urlq = `/current-video?id=${video.id.videoId}`;
              }
              else
                  urlq = `/videolist?search=${search}&ChannelId=${video.snippet.channelId}`;

              // if (isOpenModal && video === selectedVideo) {
              //     return (
              //         <Route path={`/videolist`} component={PlayerYoutube}/>
              //     )
              // } else {
              return (
                  <Link key={`VideoList_${index}`} to={urlq}>
                      <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect}/>
                  </Link>
              )
          }

            // }
        }
    );

    return(
        <div>
            {renderedVideos}
        </div>
    )
}

export default VideoList