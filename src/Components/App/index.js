import React, {Component, PureComponent} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from "../Searchbar";
import YoutubeAPI from "../YoutubeAPI";
import VideoList from "../VideoList"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
// import createBrowserHistory from "history/createBrowserHistory";
import { createBrowserHistory } from "history";
import Qwerty from "../qwerty"

const KEY = 'AIzaSyAiFx2l1_zXnPOZtJhUriJqg0BDhyWlItQ';
const history = createBrowserHistory();
const qs = require('query-string');

class App extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            nextPageToken: null,
            prevPageToken: null,
            selectedVideo: null,
            pageToken: null,
            search: "",
            isOpenModal: false,
            isOpenChannel:false,
            nameTitle: "My app",
            channelId: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVideoSelect = this.handleVideoSelect.bind(this);
        this.handleLeafing = this.handleLeafing.bind(this);
    }

    handleOnClick = e => {

            console.log('AAAAAAA !');
            let pol = document.getElementById('pol');

            if (e.target != pol && e.target.parentNode != pol) {
                this.setState({
                    selectedVideo: null,
                    isOpenModal: null
                })
            }

    };

    componentDidMount() {
        console.log('componentDidMount');
        const  s = qs.parse(history.location.search);
        console.log(s);
        this.handleSubmit(s['search']);
        // if(s['search'])
        //     this.processingVideoId();
        // if(s['id']!==null){
        //     this.setState({
        //         selectedVideo:  ,
        //         isOpenModal: true
        //     });
        // };

        console.log('history',history);
        //console.log(this.state.search);
        document.addEventListener('mouseup', this.handleOnClick);
        //document.addEventListener('click', this.handleOnClick, false);
    }

    componentWillUnmount() {
        //document.removeEventListener('click', this.handleOnClick, false);
        document.removeEventListener('mouseup', this.handleOnClick);
    }


    // processingVideoId = () => {
    //     const  s = qs.parse(history.location.search);
    //     console.log('processingVideoId', s);
    //     if(s['id']){
    //         for(let i = 0; i < 10; i++ ){
    //             if(s['id']=== this.videos[i].id.videoId)
    //                 alert('Hello');
    //         }
    //     }
    //  };




    handleVideoSelect = (video) => {
        console.log('handleVideoSelect');
        if(video.id.kind==="youtube#video"){
            this.setState({
                selectedVideo: video,
                isOpenModal: true
            });
        }
        if(video.id.kind==="youtube#channel"){
            console.log('click channel');
            this.setState({
                channelId: video.snippet.channelId,
                selectedVideo: video,
                nameTitle: `Channel ${video.snippet.title}`,
                isOpenChannel: true
            });
            this.clickChannelSelect(video)
        }

    };

    render() {
       return (
            <Router history={history}>
                <div className="container">
                    <div className="jumbotron">
                        <h3 className="display-5">
                            {this.state.nameTitle}
                        </h3>
                    </div>
                    <div>
                        <SearchBar handleFormSubmit={this.handleSubmit} searchStr = {this.state.search}/>
                    </div>

                    <div className='ui grid'>
                        <div className='ui row'>
                            <div>
                                <Route path={`/videolist`}>
                                    <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}
                                               isOpenModal = {this.state.isOpenModal} selectedVideo = {this.state.selectedVideo}
                                               search = {this.state.search} history={history} isOpenChannel={this.state.isOpenChannel}
                                    />
                                </Route>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button id='prev'  style={{display: 'none'}} onClick={() => this.handleLeafing(this.state.prevPageToken, false)}>Previous</button>
                        <button id='next' onClick={()=>this.handleLeafing(this.state.nextPageToken, true)}>Next</button>
                    </div>
                </div>
            </Router>
        )
    };


    handleSubmit = (termFromSearchBar) => {
        console.log('handleSubmit');
        const params = {
            q: termFromSearchBar,
            part: 'snippet',
            key: KEY,
            maxResults: 10
        };
        document.getElementById('btn-back').style.display = 'none';
        document.getElementById('prev').style.display = 'none';
        this.setState({
            search: termFromSearchBar,
            nameTitle: termFromSearchBar,
            channelId: null,
            isOpenChannel:false
        });
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

    clickChannelSelect = (channel) =>{
        console.log('clickChannelSelect');
        const params = {
            channelId: channel.id.channelId,
            part: 'snippet',
            key: KEY,
            maxResults: 10
        };
        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
            .then(response =>
                this.setState({
                    videos: response.data.items
                })
            )
            .catch(error => console.log("ERROR", error));
        document.getElementById('btn-back').style.display = 'initial';
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

export default App