import React from "react";
import './style.css';


const PlayerYoutube =({video}) => {
    //const  numID ='yTEei7_gYIY'
    //console.log('videoID=', video.id);
    return (
        <div id='pol'>
            {/*<div className='modalka_div' onClick={() => {CloseModalWindow()}}>*/}
            {/*    <iframe id="ytplayer" type="text/html" width="640" height="360"*/}
            {/*            src={`http://www.youtube.com/embed/${video.id.videoId}?autoplay=1&origin=http://example.com`}*/}
            {/*            frameBorder="0"/>*/}
            {/*</div>*/}
            <div>
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                        src={`http://www.youtube.com/embed/${video.id.videoId}?autoplay=1&origin=http://example.com`}
                        frameBorder="0"/>
            </div>
        </div>
    )

}

export  default  PlayerYoutube