import React, {Component} from "react";
import PlayerYoutube from "../player_youtube/player_youtube";
import VideoList from "../video_list/video_list";
import "./current_video_list.scss";
import {useSelector} from "react-redux";



const CurrentVideoList = () => {

    let  title, channelTitle, description;
    const selectedVideo = useSelector(state => state.videosReducer.selectedVideo);

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

export default CurrentVideoList;