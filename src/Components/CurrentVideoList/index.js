import React, {Component} from "react";
import PlayerYoutube from "../PlayerYoutube";
import VideoList from "../VideoList";
import "./style.css";
import {bindActionCreators} from "redux";
import {getRequest, handleSubmit} from "../../Actions";
import {connect} from "react-redux";
const qs = require('query-string');



class CurrentVideoList extends Component {

    render() {
        let identif, title, channelTitle, description;

        if(this.props.selectedVideo){
            console.log("11");
            identif = this.props.selectedVideo.id.videoId;
            title = this.props.selectedVideo.snippet.title;
            channelTitle = this.props.selectedVideo.snippet.channelTitle;
            description = this.props.selectedVideo.snippet.description;
        }
        else{
            if(this.props.selectedCV){
                console.log("22");
                identif = this.props.selectedCV[0].id;
                title = this.props.selectedCV[0].snippet.title;
                channelTitle = this.props.selectedCV[0].snippet.channelTitle;
                description = this.props.selectedCV[0].snippet.description;
            }
        }



        return (
            <div className="container">
                <div className="row">
                    <div className="col-2-3">
                        <h1>CurrentList</h1>
                        <PlayerYoutube id={identif}/>
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
                        <div>
                            <h6 className="contain-desc">
                                {description}
                            </h6>
                        </div>

                    </div>
                    <div className="col-1-3">
                        //videoList
                        <VideoList/>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state =>({
    selectedVideo: state.videos.selectedVideo,
    selectedCV: state.videos.selectedCV
});

const mapDispatchToProps = dispatch =>({
    // handleSubmit: bindActionCreators(handleSubmit, dispatch),
    // getRequest: bindActionCreators(getRequest, dispatch),

});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentVideoList);