import React, {Component} from "react";
import VideoItem from "../video_item/video_item";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import "./video_list.scss";

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
            <div className="yb-vl-main_container"/*className="container"*/>
                {renderedVideos}
            </div>
        )
    }
}

const mapStateToProps = state =>({
    videos: state.videosReducer.videos,
    selectedVideo: state.videosReducer.selectedVideo,
});



export default connect(
    mapStateToProps
)(VideoList);