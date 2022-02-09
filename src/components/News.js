import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import NewsItems from './NewsItems';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const capitalize = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ');
    }
    const updateNews = async () => {
        props.setProgress(15);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(25);
        let parsedData = await data.json();
        props.setProgress(50);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
        document.title = `${capitalize(props.category)} - NEWS`
    }, []);

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false);
    };

    // const handlePrevClick = async () => {   // prev button
    //     setPage(page-1)
    //     updateNews();
    // }
    // const handleNextClick = async () => {     //  next button
    //     // console.log("next");
    //     if (page + 1 > Math.ceil(totalResults /props.pageSize)) { }
    //     else {
    //         setPage(page+1)
    //         updateNews();
    //     }
    // }
    return (
        <>
            <h1 className='text-center' style={{ margin: "35px 0px" }}>NEWS - Top Headlines from {capitalize(props.category)}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container my-3'>
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage}
                                    newsUrl={element.url} source={element.source.name} author={element.author} date={element.publishedAt} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>
             {/* Prev and Next Buttons */}
            {/* <div className="container d-flex justify-content-between my-4"> 
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults /props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News;
