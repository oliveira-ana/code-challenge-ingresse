import React, { Component } from 'react';
import SeriesInCard from './SeriesInCard.js';
import { Container } from 'aphrodite-react';

export default class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
        series: []
      };
    }

    componentDidMount() {
      const BASE_URL = 'http://api.tvmaze.com/';

      fetch(`${BASE_URL}/search/shows?q=star wars`)
        .then(res => res.json())
        .then(data => this.setState({ series: data }));
    };

  render() {
    return (
      <Container fluid>
        <header>
          <h1>Code Challenge Ingresse</h1>

        </header>
        <div>
          {this.state.series.map( (serie) =>
            <SeriesInCard {...serie} key={serie.show.id} />
          )}
        </div>
      </Container>
    );
  }
}

