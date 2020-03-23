import React, {Component} from "react";
import VideoItem from "../VideoItem";
import PlayerYoutube from "../PlayerYoutube";
import {Route, Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {getRequest, handleSubmit, handleSelectVideo} from "../../Actions";
import {connect} from "react-redux";
const qs = require('query-string');


class VideoList extends Component{

    render() {
        const renderedVideos = this.props.videos.map((video, index) => {

            if(video==this.props.selectedVideo){

                }else{
                    let urlq;
                    if(video.id.kind==="youtube#video"){
                        // if(isOpenChannel)
                        //     urlq = `/current-channel?ChannelId=${video.snippet.channelId}&id=${video.id.videoId}`;
                        // else
                        urlq = `/current-video?id=${video.id.videoId}`;
                    }
                    else
                        urlq = `/current-channel?ChannelId=${video.snippet.channelId}`;


                    return (
                        <div >
                            <Link key={`VideoList_${index}`} to={urlq}>
                                <VideoItem onClick={ () => this.props.handleSelectVideo(video)}
                                           key={`VideoList_${index}`}
                                           video={video}/>
                            </Link>
                        </div>

                    )
                }
            }
        );

        return(
            <div>
                {renderedVideos}
            </div>
        )
    }
}

const mapStateToProps = state =>({
    videos: state.videos.videos,
    selectedVideo: state.videos.selectedVideo,
});

const mapDispatchToProps = dispatch =>({
    handleSelectVideo: bindActionCreators(handleSelectVideo, dispatch)
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoList);