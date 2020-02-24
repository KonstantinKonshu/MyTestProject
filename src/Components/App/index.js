import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from "../Searchbar";
import YoutubeAPI from "../YoutubeAPI";
import VideoList from "../VideoList"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import Qwerty from "../qwerty"

const KEY = 'AIzaSyDf4KrC8LEQ4tcHCz1e53od21s-341bIKc';
const history = createBrowserHistory();
const qs = require('query-string');





class App extends Component{
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
            nameTitle: "My app",
            channelId: null
        };
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage=this.handlePreviousPage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVideoSelect = this.handleVideoSelect.bind(this);
    }

    handleOnClick = e => {
        let pol = document.getElementById('pol');
        if(e.target != pol && e.target.parentNode != pol){
            this.setState({
                selectedVideo: null,
                isOpenModal: null
            })
        }
    };

    componentDidMount() {
        // console.log(history.location.search);
        const  s = qs.parse(history.location.search);
        // console.log(s);
        // this.setState({
        //     search: s['search'] || ""
        // });
        this.handleSubmit(s['search']);
        //console.log(this.state.search);
        document.addEventListener('mouseup', this.handleOnClick);

    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleOnClick);
    }


    handleSubmit = termFromSearchBar => {
        document.getElementById('btn-back').style.display = 'none';
        document.getElementById('prev').style.display = 'none';
        this.setState({search: termFromSearchBar, nameTitle: termFromSearchBar, channelId: null});
        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                q: termFromSearchBar,
                part: 'snippet',
                key: KEY,
                maxResults: 10,
                // kind: "youtube#video"
            }
        })
            .then(response => this.setState({videos: response.data.items, nextPageToken: response.data.nextPageToken, prevPageToken: response.data.prevPageToken}))
            .catch(error => console.log("ERROR", error))
    };

    clickChannelSelect = (channel) =>{
        // this.setState({search: termFromSearchBar});
        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                // q: termFromSearchBar,
                channelId: channel.id.channelId,
                part: 'snippet',
                key: KEY,
                maxResults: 10
            }
        })
            .then(response => this.setState({videos: response.data.items, count: response.data.items.length}))
            .catch(error => console.log("ERROR", error));
        document.getElementById('btn-back').style.display = 'initial';
    };


    handleVideoSelect = (video) => {
        if(video.id.kind==="youtube#video"){
            this.setState({
                selectedVideo: video,
                isOpenModal: true
            })
        }
        if(video.id.kind==="youtube#channel"){
            console.log('click channel');
            // alert(`channel ${video.snippet.title}`);

            this.setState({
                channelId: video.snippet.channelId,
                selectedVideo: video,
                nameTitle: `Channel ${video.snippet.title}`
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
                        {/*<Link to={`/search/${this.state.termFromSearchBar}`}>*/}
                            <SearchBar handleFormSubmit={this.handleSubmit} />
                        {/*</Link>*/}
                    </div>

                    <div className='ui grid'>
                        <div className='ui row'>
                            <div>
                                {/*    <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}*/}
                                {/*               isOpenModal = {this.state.isOpenModal} selectedVideo = {this.state.selectedVideo}*/}
                                {/*    />*/}

                                    {/*<Route path='/videolist' component={Qwerty}/>*/}
                                    {/*<Route path='/videolist'>*/}
                                    {/*    <Qwerty*/}
                                    {/*        search = {this.state.search}*/}
                                    {/*    />*/}
                                    {/*</Route>*/}
                                    <Route path={`/videolist`}>
                                        <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}
                                                   isOpenModal = {this.state.isOpenModal} selectedVideo = {this.state.selectedVideo}
                                                   search = {this.state.search}
                                        />
                                    </Route>
                            </div>
                        </div>
                    </div>
                    {/*<PersonList/>*/}
                    <div>
                        {/*<Route path='/search'>*/}
                            <h1>lol</h1>
                        {/*</Route>*/}
                    </div>

                    <div>
                        <button id='prev' style={{display: 'none'}} onClick={this.handlePreviousPage}>Previous</button>
                        <button id='next' onClick={this.handleNextPage}>Next</button>
                    </div>

                    {/*<div>*/}
                    {/*    {PlayerYB}*/}
                    {/*</div>*/}

                    {/*<PlayerYoutube video={this.state.selectedVideo}/>*/}

                    {/*<ArticleList  articles={this.state.reverted ? articles.slice().reverse() : articles} foo="bar" flag/>*/}
                </div>
            </Router>
        )
    };

    handleNextPage = () => {
        let params = {
            q: this.state.search,
            part: 'snippet',
            key: KEY,
            maxResults: 10,
            pageToken: this.state.nextPageToken,
        };
        if (this.state.channelId !== null) {
            params["channelId"] = this.state.channelId;
            params['type'] = "video"
        }

        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
            .then(response => this.setState({videos: response.data.items, count: response.data.items.length, nextPageToken: response.data.nextPageToken, prevPageToken: response.data.prevPageToken}))
            .catch(error => console.log("ERROR", error));
        document.getElementById('prev').style.display = 'initial';
        //document.getElementById('prev').hidden = true;
    };

    handlePreviousPage = () => {
        let params = {
            q: this.state.search,
            part: 'snippet',
            key: KEY,
            maxResults: 10,
            pageToken: this.state.prevPageToken,
        };
        if (this.state.channelId !== null) {
            params["channelId"] = this.state.channelId;
            params['type'] = "video"

        }

        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
            .then(response => this.setState({videos: response.data.items, nextPageToken: response.data.nextPageToken, prevPageToken: response.data.prevPageToken}))
            .catch(error => console.log("ERROR", error));
        // if(this.state.prevPageToken==='undefined')
        //     alert(this.state.prevPageToken);
    };

    // revert = () => this.setState(
    //     {
    //         reverted: !this.state.reverted
    //     }
    // );
    //
    // ClickSearch = async (termFromSearchBar) => {
    //         try {
    //             const response = await YoutubeAPI.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${termFromSearchBar}&key=AIzaSyACPUVcES9XwGzLSbsEAeGSRjJ9wSBQcz4`);
    //             this.setState({
    //                 videos: response.data.items
    //             })
    //         } catch (e) {
    //
    //         }
    //     };



    // handlePageClick = data => {
    //     console.log('111')
    //     let selected = data.selected;
    //     let offset = Math.ceil(selected * this.props.perPage);
    //     console.log(offset)
    //     this.setState({ offset: offset }, () => {
    //         this.handleSubmit();
    //     });
    // };




}

export default App
// render(<Router></Router>
//
//     ,document.getElementById('root'))