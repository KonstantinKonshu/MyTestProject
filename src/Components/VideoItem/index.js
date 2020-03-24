import React, {Component} from "react";
import './style.css';
import {animateScroll as scroll} from "react-scroll";







const VideoItem = ({video, handleSelectVideo}) => {
    const clickItem = (video) =>{
        scroll.scrollToTop();
        handleSelectVideo(video);
    }
    return(
        <div onClick={()=>clickItem(video)} className='video-item item'>

            <div className={video.id.kind==="youtube#video" && 'itemsContainer'}>
                <img className='ui-image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                <div className="play"><img src="https://img.icons8.com/color/48/000000/youtube-play.png"/></div>
            </div>
            <h6 className="content">
                {video.snippet.title}
            </h6>
        </div>
    )
};


export default VideoItem;