import React, {Component, PureComponent} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from "../Searchbar";
import YoutubeAPI from "../YoutubeAPI";
import VideoList from "../VideoList"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { createBrowserHistory } from "history";
import Qwerty from "../qwerty"
import CurrentVideoList from "../CurrentVideoList";
import CurrentChannelList from "../CurrentChannelList";
import "./style.css";
import { animateScroll as scroll,  scroller } from 'react-scroll';
import {connect} from "react-redux";


const KEY = 'AIzaSyCIg-49NReS9Qk-ufTjsb7m7tZ_HnI0qqQ';
//const history = null;//syncHistoryWithStore(browserHistory, store)
const qs = require('query-string');

class App extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            //videos: [],
            nextPageToken: null,
            prevPageToken: null,
            //selectedVideo: null,
            pageToken: null,
            //search: "",
            //isOpenChannel: false,
            //nameTitle: "My app",
            //channelId: null,
            checkBtn: false,
            //selectedCV: null,
            bannerChannel: null
        };
       // console.log("props", props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVideoSelect = this.handleVideoSelect.bind(this);
        this.handleLeafing = this.handleLeafing.bind(this);
       // const {history} = props;
    }

    handleOnClick = e => {
        console.log('handleOnClick');

        let btn_s = document.getElementById('btn_s');
        if (e.target == btn_s || e.target.parentNode == btn_s) {
            this.setState({
                checkBtn: true
            })
        }
    };

    componentDidMount() {
        console.log('componentDidMount');
        const  s = qs.parse(this.props.searchRouting);
        console.log("elem S=== ",s);
        if(s['search']!==undefined){
            console.log("s_search");
            this.handleSubmit(s['search']);
        }
        else{
            if(s['ChannelId']!==undefined){
                console.log("s_channelID");
                this.handleSubmit(s['ChannelId']);
            }else{
                if(s['id']!==undefined){
                    console.log("s_id");
                    this.handleSubmit(s['id']);
                }
            }
        }

        document.addEventListener('mouseup', this.handleOnClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleOnClick);
    }

    handleVideoSelect = (video) => {
        scroll.scrollToTop();
        if(video.id.kind==="youtube#video"){
            this.setState({
                selectedVideo: video,
                isOpenModal: true
            });
        }
        if(video.id.kind==="youtube#channel"){
            this.setState({
                channelId: video.snippet.channelId,
                selectedVideo: video,
                nameTitle: `Channel ${video.snippet.title}`,
                isOpenChannel: true
            });
            this.clickChannelSelect(video.id.channelId);
            document.getElementById('btn-back').style.display = 'initial';
        }

    };


    clickChannelSelect = (channelID) =>{

        console.log('clickChannelSelect', channelID);
        const params = {
            channelId: channelID,
            part: 'snippet',
            key: KEY,
            maxResults: 10
        };
        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
            .then(response =>
                this.setState({
                    videos: response.data.items,
                    nextPageToken: response.data.nextPageToken,
                    prevPageToken: response.data.prevPageToken
                })
            )
            .catch(error => console.log("ERROR", error));


        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/channels',{
            params:{
                id: channelID,
                part: 'snippet,brandingSettings',
                key: KEY
            }
            })
            .then(response =>{
                this.setState({
                    bannerChannel: response.data.items[0].brandingSettings.image.bannerImageUrl,
                    isOpenChannel: true,
                    checkBtn: false
                });
                console.log('banner', this.state.bannerChannel);
            })
            .catch(error => console.log("ERROR", error));

        document.getElementById('btn-back').style.display = 'initial';
        document.getElementById('next').style.display = 'initial';
    };





    render() {
        //console.log("testStore", this.props.testStore);
       return (
            <div>
                <div className="header_jumbotron">
                    <SearchBar //handleFormSubmit={this.handleSubmit}
                               //history={this.props.history}
                    />
                </div>

                <div className="bannerChannel">
                    <img className="img_banner" src={this.state.isOpenChannel && this.state.bannerChannel}/>
                </div>

                <div className="container">
                    {this.props.nameTitle}
                    <div>
                        <Route path={`/videolist`}>
                            <VideoList />
                        </Route>
                    </div>

                    <div id="div_btn_control">
                        <button id='prev'  style={{display: 'none'}} onClick={() => this.handleLeafing(this.state.prevPageToken, false)}>Previous</button>
                        <button id='next' onClick={()=>this.handleLeafing(this.state.nextPageToken, true)}>Next</button>
                    </div>
                </div>

                <div>
                    <Route path='/current-video'>
                        <CurrentVideoList/>
                    </Route>
                </div>

                <div>
                    <Route path='/current-channel'>
                        <CurrentChannelList/>
                    </Route>
                </div>

            </div>
        )
    };


    handleSubmit = (termFromSearchBar) => {
        console.log('handleSubmit', termFromSearchBar);
        document.getElementById('btn-back').style.display = 'none';
        document.getElementById('prev').style.display = 'none';
        document.getElementById('next').style.display = 'initial';


        this.setState({
            //search: termFromSearchBar,
            nameTitle: termFromSearchBar,
            channelId: null,
            isOpenChannel:false
        });

        if(this.props.history.location.pathname==="/current-video" && !this.state.checkBtn){
            console.log('handleSubmitCURRENT-Video');
            YoutubeAPI.get(`https://www.googleapis.com/youtube/v3/videos?id=${termFromSearchBar}&key=${KEY}&part=snippet,contentDetails,statistics,status`)
                .then(response =>{
                    this.setState({
                        selectedCV: response.data.items,
                        selectedVideo: null
                    });
                    console.log("handleSubmitCURRENT--requiest", response)
                    this.gettingSimilarVideos(response.data.items[0].snippet.title)
                })
                .catch(error => console.log("ERROR", error));
        }
        else{
            if(this.props.history.location.pathname==="/videolist" || this.state.checkBtn){
                console.log('handleSubmitSEARCH');
                const params = {
                    q: termFromSearchBar,
                    part: 'snippet',
                    key: KEY,
                    maxResults: 10
                };
                YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
                    .then(response =>
                        this.setState({
                            videos: response.data.items,
                            nextPageToken: response.data.nextPageToken,
                            prevPageToken: response.data.prevPageToken,
                            checkBtn:false
                        })
                    )
                    .catch(error => console.log("ERROR", error));
                // this.submitToVideolist(termFromSearchBar);
                // this.setState({
                //     checkBtn:false
                // });
            }
            else{
                if(this.props.history.location.pathname==="/current-channel"){
                    console.log('handleSubmitCURRENT-CHANNEL');
                    this.clickChannelSelect(termFromSearchBar);
                    // this.setState({
                    //     checkBtn:false
                    // });
                    //document.getElementById('btn-back').style.display = 'none';
                }
            }
            // this.setState({
            //     checkBtn:false
            // });
        }

    };

    gettingSimilarVideos = (termName) => {
        const params = {
            q: termName,
            part: 'snippet',
            key: KEY,
            maxResults: 10
        };
        console.log("termName", termName);
        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
            .then(response =>
                this.setState({
                    videos: response.data.items,
                    nextPageToken: response.data.nextPageToken,
                    prevPageToken: response.data.prevPageToken
                })
            )
            .catch(error => console.log("ERROR", error));
    };

    handleLeafing = (pgToken, indicator) => {
        console.log('handleLeafing');
        let params = {
            q: this.state.search,
            part: 'snippet',
            key: KEY,
            maxResults: 10,
            pageToken: pgToken,
        };
        if (indicator) document.getElementById('prev').style.display = 'initial';

        if (this.state.channelId !== null) {
            params["channelId"] = this.state.channelId;
            params['type'] = "video";
        }
        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
            .then(response => {
                this.setState({
                    videos: response.data.items,
                    nextPageToken: response.data.nextPageToken,
                    prevPageToken: response.data.prevPageToken
                });
                console.log(response.data.prevPageToken);
                if (response.data.prevPageToken === undefined)
                    document.getElementById('prev').style.display = 'none';
                })
            .catch(error => console.log("ERROR", error));
    };
}





const mapStateToProps = state =>({
    isOpenChannel: state.channels.isOpenChannel,
    nameTitle: state.channels.nameTitle,
    searchRouting: state.routing.locationBeforeTransitions.search,
});




export default connect(
    mapStateToProps
)(App);