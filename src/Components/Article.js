import React, {PureComponent} from "react";

class Article extends PureComponent{

    /* constructor(props) {
         super(props);
         this.state = {
             isOpen: true
         }
         this.handleClick = handleClick.bind(this)
     }*/



    /*state = {
        isOpen: this.props.defaultOpen//true
    }*/

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.defaultOpen,
            count: 0
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.isOpen !== nextState.isOpen
    // }

    componentWillMount() {
        console.log('---', 'mouting')
    }
    componentWillReceiveProps(nextProps) {
        //console.log('---', 'component receive props')
        if(nextProps.defaultOpen !== this.props.defaultOpen) this.setState({
            isOpen: nextProps.defaultOpen
        })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('---', 'will update')
    }

    render() {
        const {article} = this.props
        const body = this.state.isOpen && <section className="card-text">{article.text}</section>
        return (
            <div className="card mx-auto" style={{width: '50%'}}>
                <div className="card-header">
                    <h2 onClick={this.incrementCounter}>
                        {article.title}
                        clicked {this.state.count}
                        <button onClick={this.handleClick} className="btn btn-primary btn-lg float-right">
                            {this.state.isOpen ? "close" : "open"}
                        </button>
                    </h2>
                </div>
                <div className="card-body">
                    {body}
                    <h6 className="card-subtitle text-muted">
                        creation date: {(new Date(article.date)).toDateString()}
                    </h6>
                </div>

            </div>
        )
    }

    handleClick = () => {
        console.log("--", "clicked")
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    incrementCounter = () =>{
        console.log('---', 'increment count')
        this.setState({
            count: this.state.count + 1
        })
    }

}



/*
function handleClick(){
    console.log("--", "clicked")
    this.setState = !this.state.isOpen
}*/


export default Article