import React from "react";
import './style.css';
const qs = require('query-string');

const PlayerYoutube =(props) => {
    //const  numID ='yTEei7_gYIY'
    //console.log('videoID=', video.id);
    const s= qs.parse(props.location.search)

    console.log("PlayerY",props);
    // console.log(s["id"]);
    // const id= props.match.params.id;
    // console.log(id);
    return (
        <div id='pol' className='pol'>
            <div>
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                        src={`http://www.youtube.com/embed/${s["id"]}?autoplay=1&origin=http://example.com`}
                        frameBorder="0"/>
            </div>
        </div>
    )

}

export  default  PlayerYoutube