import React, {Component} from "react";
// import ArticleList from "./ArticleList"
// import articles from "../fixtures"
import 'bootstrap/dist/css/bootstrap.css';
// import axios from 'axios'
//
// import PersonList from "./PersonList";
import SearchBar from "./Searchbar";
import YoutubeAPI from "./YoutubeAPI";
import VideoList from "./VideoList";
//import './stylePagination.css';
// import PlayerYoutube from "./PlayerYoutube";

const KEY = 'AIzaSyDf4KrC8LEQ4tcHCz1e53od21s-341bIKc';




class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // reverted: false,
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
        var pol = document.getElementById('pol');
        if(e.target != pol && e.target.parentNode != pol){
            this.setState({
                selectedVideo: null,
                isOpenModal: null
            })
        }
    }

    componentDidMount() {
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
            .then(response => this.setState({videos: response.data.items, count: response.data.items.length, nextPageToken: response.data.nextPageToken, prevPageToken: response.data.prevPageToken}))
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

    // closeModalWindow = () =>{
    //     console.log('close window')
    //     this.setState({
    //         isOpenModal: false
    //     })
    // }

    render() {
        // const  PlayerYB = this.state.isOpenModal && <PlayerYoutube video={this.state.selectedVideo} CloseModalWindow={this.CloseModalWindow}/>
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3 className="display-5">
                        {/*My app*/}
                        {this.state.nameTitle}
                        {/*<button className="btn btn-dark" onClick={this.revert}>Revert</button>*/}
                    </h3>
                </div>
                <div>
                    <SearchBar handleFormSubmit={this.handleSubmit} />
                </div>

                <div className='ui grid'>
                    <div className='ui row'>
                        <div>
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}
                                       isOpenModal = {this.state.isOpenModal} selectedVideo = {this.state.selectedVideo}
                            />
                        </div>
                    </div>
                </div>
                {/*<PersonList/>*/}

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