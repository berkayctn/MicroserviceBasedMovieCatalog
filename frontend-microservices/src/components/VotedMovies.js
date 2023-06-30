import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VotedMovies = () => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    movies();
  }, []);

  const movies = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.get('http://localhost:8081/catalog/1');
      setResponse(response.data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error while fetching data:', error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const Spinner = () => {
    return (
      <div className="spinner-cover-1">
        <div
          className="spinner-border"
          style={{ width: '3rem', height: '3rem' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="spinner-text">Loading...</span>
      </div>
    );
  };

  const ErrorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ width: '60%', margin: 'auto' }}
        role="alert"
      >
        An error occurred while loading this component. Please try again.
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <div className="popular-movies-container">
          <div className="populer-movies-cards">
            {response.map((item, index) => (
              <div class="card" style={{ width: '18rem' }} key={index}>
                <img
                  src={item.posterPath}
                  class="card-img-top"
                  style={{ minHeight: '429px' }}
                  alt="..."
                />
                <div id={index} class="card-body">
                  <div className="my-card-context">
                    <h5 class="card-title">{item.name}</h5>
                    <p class="card-text">{item.description}</p>
                  </div>
                  <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <div>
                      <span
                        className="badge bg-primary rounded-pill"
                        style={{ padding: '5px 10px' }}
                      >
                        Vote Average:&nbsp;
                        {parseFloat(item.voteAverage.toFixed(1))} / 10
                      </span>
                    </div>
                    <div>
                      <span
                        className="badge bg-primary rounded-pill"
                        style={{ padding: '5px 10px' }}
                      >
                        Your Vote:&nbsp;
                        {item.rating} / 10
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VotedMovies;
