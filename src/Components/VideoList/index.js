import React from "react";
import VideoItem from "../VideoItem";
import PlayerYoutube from "../PlayerYoutube";


const VideoList = ({videos, handleVideoSelect, isOpenModal,  selectedVideo}) => {
    // const  PlayerYB = isOpenModal && <PlayerYoutube video={selectedVideo} closeModalWindow={closeModalWindow}/>
    // const PlayerYB
    const renderedVideos = videos.map((video) => {

            if(isOpenModal && video === selectedVideo){
                return(
                    <PlayerYoutube video={selectedVideo}/>
                )
            }else{
                return(
                    <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect}/>
                )
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