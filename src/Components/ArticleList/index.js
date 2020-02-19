import React, {Component, PureComponent} from "react";
import Article from "../Article";
import './style.css'


export default class ArticleList extends PureComponent{
    // const articleElements = articles.map((article, index) =>
    //     <li key={article.id} className="article-list__li">
    //         <Article article = {article} defaultOpen = {index === 0}/>
    //     </li>
    // )
    render(){
        const articleElements = this.props.articles.map((article, index) =>
            <li key={article.id} className="article-list__li">
                <Article article = {article} defaultOpen = {index === 0}/>
            </li>
        )
        return(
            <ul>
                {articleElements}
            </ul>
        )
    }

    /*return(
        <ul>
            <li><Article article={articles[0]} /></li>
            <li><Article article={articles[1]} /></li>
            <li><Article article={articles[2]} /></li>
            <li><Article article={articles[3]} /></li>
        </ul>
    )*/

}