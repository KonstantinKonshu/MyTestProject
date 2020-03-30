import React, {Component} from "react";
import VideoItem from "../VideoItem";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
const qs = require('query-string');

class VideoList extends Component{

    render() {
        const renderedVideos = this.props.videos.map((video, index) => {

                if(video!==this.props.selectedVideo){
                    let urlq;
                    if(video.id.kind==="youtube#video")
                        urlq = `/current-video?id=${video.id.videoId}`;
                    else
                        urlq = `/current-channel?ChannelId=${video.snippet.channelId}`;

                    return (
                        <div>
                            <Link key={`VideoList_${index}`} to={urlq}>
                                <VideoItem key={`VideoList_${index}`} video={video}/>
                            </Link>
                        </div>
                    )
                }
            }
        );

        return(
            <div className="container">
                {renderedVideos}
            </div>
        )
    }
}

const mapStateToProps = state =>({
    videos: state.videos.videos,
    selectedVideo: state.videos.selectedVideo,
});



export default connect(
    mapStateToProps
)(VideoList);