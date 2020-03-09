import React, {Component} from "react";
import PlayerYoutube from "../PlayerYoutube";
import VideoList from "../VideoList";
import "./style.css";
const qs = require('query-string');



// class CurrentVideoList extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentVideoItem: null,
//             currentVideoItemId: null
//         };
//         // const {history, videos, selectedVideo, handleVideoSelect, isOpenChannel} = props;
//     }
//
//     componentDidMount() {
//         console.log('componentDidMount-CV', this.props.selectedVideo);
//         const  s = qs.parse(this.props.history.location.search);
//         console.log(s);
//
//         this.SelectItemHandle(s);
//         console.log("state-CV", this.state);
//         // if(s['search']!==undefined)
//         //     this.handleSubmit(s['search']);
//         // if(s['id']!==undefined)
//         //     this.handleSubmit(s['id']);
//         // console.log('history', this.history);
//         document.addEventListener('mouseup', this.handleOnClick);
//     }
//
//     componentWillUnmount() {
//         document.removeEventListener('mouseup', this.handleOnClick);
//     }
//
//     SelectItemHandle = (s) =>{
//         if(s["id"]===undefined && this.props.selectedVideo!==null){
//             console.log("11");
//             this.setState({
//                currentVideoItem: this.props.selectedVideo,
//                 currentVideoItemId: this.props.selectedVideo.id.videoId
//             });
//             // SV = selectedVideo;
//             // identif = SV.id.videoId;
//         }
//         else{
//             console.log("22");
//             this.setState({
//                 currentVideoItem: this.props.selectedVideo && this.props.selectedVideo[0],
//                 currentVideoItemId: this.props.selectedVideo && this.props.selectedVideo[0].id
//             });
//             // selectedVideo = selectedVideo && selectedVideo[0];
//             // SV =selectedVideo && selectedVideo[0];
//             // identif = SV.id;//s["id"];
//         }
//     };
//
//     render() {
//         return(
//             <div className="container">
//                 <div className="row">
//                     <div className="col-2-3">
//                         <h1>CurrentList</h1>
//
//                         <PlayerYoutube id={this.state.currentVideoItemId}/*selectedVideo={selectedVideo}*//>
//                         {/*<div>*/}
//                         {/*    <h4>*/}
//                         {/*        {SV.snippet.title}*/}
//                         {/*    </h4>*/}
//                         {/*</div>*/}
//                         {/*<div>*/}
//                         {/*    <h5>*/}
//                         {/*        {SV.snippet.channelTitle}*/}
//                         {/*    </h5>*/}
//                         {/*</div>*/}
//                         {/*<div>*/}
//                         {/*    <h6>*/}
//                         {/*        {selectedVideo.snippet.description}*/}
//                         {/*    </h6>*/}
//                         {/*</div>*/}
//
//                     </div>
//                     <div className="col-1-3">
//                         //videoList
//                         <VideoList handleVideoSelect={this.props.handleVideoSelect} videos={this.props.videos}
//                                    selectedVideo = {this.props.selectedVideo} history={this.props.history}
//                                    isOpenChannel={this.props.isOpenChannel}
//                         />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// };


const CurrentVideoList = (props) => {

    const {history, videos, selectedVideo, handleVideoSelect, isOpenChannel, selectedCV} = props;
    console.log('CurrentVideo', props);

    // const  s = qs.parse(history.location.search);
    let identif, title, channelTitle, description;

    if(/*s["id"]===undefined && */selectedVideo!==null){
        console.log("11");
        identif = selectedVideo.id.videoId;
        title = selectedVideo.snippet.title;
        channelTitle = selectedVideo.snippet.channelTitle;
        description = selectedVideo.snippet.description;
    }
    else{
        if(selectedCV /*&& s["id"]!==undefined*/){
            console.log("22");
            identif = selectedCV[0].id;
            title = selectedCV[0].snippet.title;
            channelTitle = selectedCV[0].snippet.channelTitle;
            description = selectedCV[0].snippet.description;
        }
    }
    console.log("CV-history-select-videos", selectedVideo);        //текущее видео лежит здесь
    console.log("CV-history-FULL", history);
    console.log("CV-history-select-snippet", selectedCV);

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
                    <VideoList handleVideoSelect={handleVideoSelect} videos={videos}
                               selectedVideo = {selectedVideo} history={history} isOpenChannel={isOpenChannel}
                    />
                </div>
            </div>
        </div>
    )
};

export default CurrentVideoList;