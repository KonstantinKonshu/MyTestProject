import React from "react";
import './style.css';


const VideoItem = ({video, handleVideoSelect}) => {

    return(
        <div onClick={ () => {handleVideoSelect(video)}} className='video-item item'>

            <div className={video.id.kind==="youtube#video" && 'itemsContainer'}>
                <img className='ui-image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                <div className="play"><img src="https://img.icons8.com/color/48/000000/youtube-play.png"/></div>
            </div>
            {/*<div className='content'>*/}
            {/*    <div className='content'>*/}
                    <h6 className="content">
                        {video.snippet.title}
                    </h6>
                {/*</div>*/}
            {/*</div>*/}
        </div>
    )
};

export default VideoItem