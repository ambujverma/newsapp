import React, { Component } from 'react';
import NewsItems from './NewsItems';

export class News extends Component {

    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=6598ac48e9514e408f7f65e8ccc956ba&page=1pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }


    handlePrevClick = async () => {
        console.log("prev");
        
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6598ac48e9514e408f7f65e8ccc956ba&page=${this.state.page - 1 }&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
            page: this.state.page - 1,
            articles:parsedData.articles
            })
        
        
    }
    handleNextClick = async () => {
        console.log("next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }
        else{
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=6598ac48e9514e408f7f65e8ccc956ba&page=${this.state.page + 1 }&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
            page: this.state.page +1,
            articles:parsedData.articles
            })
        }
    }



  render() {

    return (

    <div className='container my-3'>
        <h1 className='text-center'>newsMonkey - Top Headlines</h1>
        
        <div className="row">
            {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                    <NewsItems  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} 
                    newsUrl={element.url}/>
                </div>
        })}
            
        </div>
        <div className="container d-flex justify-content-between my-4">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

    </div>);
  }
}

export default News;
