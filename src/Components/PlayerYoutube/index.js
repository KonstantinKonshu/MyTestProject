import React from "react";
import './style.css';
import {useSelector} from "react-redux";

const PlayerYoutube =() => {

    const selectedVideo = useSelector(state => state.videos.selectedVideo);

    let identif;
    if(selectedVideo){
        const {id} = selectedVideo;
        identif = id.videoId || id;
    }

    return (
        <div id='pol'>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
                    src={`http://www.youtube.com/embed/${identif}?autoplay=1&origin=http://example.com`}
                    frameBorder="0"/>
        </div>
    )

}

export  default  PlayerYoutube