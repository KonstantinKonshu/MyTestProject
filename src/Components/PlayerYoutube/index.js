import React from "react";
import './style.css';
const qs = require('query-string');

const PlayerYoutube =(props) => {
    //const  numID ='yTEei7_gYIY'
    //console.log('videoID=', video.id);
    //const s= qs.parse(props.location.search)

    // const {selectedVideo} = props;
    // console.log(selectedVideo.id.videoId);
    console.log("PY",props);
    // console.log("PY", videoId);
    return (
        <div id='pol'>
            <div>
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                        src={`http://www.youtube.com/embed/${props.id}?autoplay=1&origin=http://example.com`}
                        frameBorder="0"/>
            </div>
        </div>
    )

}

export  default  PlayerYoutube