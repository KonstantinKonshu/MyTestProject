import React from "react";
import VideoItem from "../VideoItem";
import PlayerYoutube from "../PlayerYoutube";
import {Route, Link} from "react-router-dom";
const qs = require('query-string');


const VideoList = (props) => {
    const { videos, handleVideoSelect, selectedVideo, isOpenChannel, history} = props;
    console.log("videolist--", props);
    console.log("videolist-History", history);

    const renderedVideos = videos.map((video, index) => {
          if(video===selectedVideo){

          }else{
              let urlq;
              if(video.id.kind==="youtube#video"){
                  // if(isOpenChannel)
                  //     urlq = `/current-channel?ChannelId=${video.snippet.channelId}&id=${video.id.videoId}`;
                  // else
                      urlq = `/current-video?id=${video.id.videoId}`;
              }
              else
                  urlq = `/current-channel?ChannelId=${video.snippet.channelId}`;


              return (
                  <div>
                      {/*<div><a href="/current-video">Hmmm...</a></div>*/}
                       <Link key={`VideoList_${index}`} to={urlq}>
                          <VideoItem key={`VideoList_${index}`} video={video} handleVideoSelect={handleVideoSelect}/>
                      </Link>
                  </div>


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