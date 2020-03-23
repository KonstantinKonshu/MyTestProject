import React from "react";
import './style.css';

const VideoItem = ({video}) => {

    return(
        <div /*onClick={ () => this.props.handleSelectVideo(video)}*/ className='video-item item'>

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