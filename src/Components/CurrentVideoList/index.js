import React, {Component} from "react";
import PlayerYoutube from "../PlayerYoutube";
import VideoList from "../VideoList";
import "./style.css";
import {useSelector} from "react-redux";
const qs = require('query-string');



const CurrentVideoList = () => {

    let  title, channelTitle, description;
    const selectedVideo = useSelector(state => state.videos.selectedVideo);

    if(selectedVideo){
        title = selectedVideo.snippet.title;
        channelTitle = selectedVideo.snippet.channelTitle;
        description = selectedVideo.snippet.description;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-2-3">
                    <PlayerYoutube/>
                    <div className="contain-desc">
                        <h4>
                            {title}
                        </h4>
                    </div>
                    <div className="contain-desc">
                        <h5>
                            {channelTitle}
                        </h5>
                    </div>
                    <div className="contain-desc">
                        <h6>
                            {description}
                        </h6>
                    </div>

                </div>
                <div className="col-1-3">
                    <VideoList/>
                </div>
            </div>
        </div>
    )

};

// const mapStateToProps = state =>({
//     selectedVideo: state.videos.selectedVideo
// });



export default CurrentVideoList;