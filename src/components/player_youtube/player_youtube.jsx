import React from "react";
import './player_youtube.scss';
import {useSelector} from "react-redux";

const PlayerYoutube =() => {

    const selectedVideo = useSelector(state => state.videosReducer.selectedVideo);

    let identif;
    if(selectedVideo){
        const {id} = selectedVideo;
        identif = id.videoId || id;
    }

    return (
        <div className="yb-py-main_container">
            <iframe className='yb-py-player_body' type="text/html" //width="640" height="360"
                    src={`http://www.youtube.com/embed/${identif}?autoplay=1&origin=http://example.com`}
                    frameBorder="0"/>
        </div>

    )

}

export  default  PlayerYoutube