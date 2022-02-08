import React, { Component } from 'react';
export class NewsItems extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, source, author, date } = this.props; // this is called destructuring
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0"
          }}>
            <span className="badge rounded-pill bg-warning text-dark">{source}</span>
          </div>
          <img src={imageUrl ? imageUrl : "https://www.pewresearch.org/wp-content/uploads/sites/8/2016/07/PJ_2016.07.07_Modern-News-Consumer_0-01.png"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">read more</a>
          </div>
        </div>
      </div>);
  }
}

export default NewsItems;
