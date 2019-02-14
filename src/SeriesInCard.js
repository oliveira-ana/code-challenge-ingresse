import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'aphrodite-react';
import PropTypes from "prop-types";
import './Card.css';

const Card = (props) => {
  return (
    <div className="my-card">
      { props.children }
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};


export default class SeriesInCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: []
    };
    this.getSeriesItens = this.getSeriesItens.bind(this);
  }

  getSeriesItens(event) {
    const BASE_URL = 'http://api.tvmaze.com';

    fetch(`${BASE_URL}/shows/${this.props.show.id}`)
      .then(res => res.json())
      .then(data => this.setState({ details: data}));
    };

    
  render() {
    return (
      <Card key={ this.props.show.id }>
        <h2>{ this.props.show.name }</h2>
        <h3>{ this.props.show.genres + ' ' }</h3>
        <div>
          <img src={ this.props.show.image.medium }/>
        </div>
        <Router>
          <div>
            <Link to="/details"><Button color="black" onClick={this.getSeriesItens}>Detalhes</Button></Link>
            <Route path="/details" render={ () =>
              <div>             
                <h2> Título: { this.props.show.name }</h2>
                <h3> Gênero: { this.props.show.genres + ' ' }</h3>
                { this.props.show.summary }
                <h4> Data de Lançamento:{ this.props.show.premiered }</h4>
              </div>
            } />
          </div>
        </Router>
      </Card>
    );
  }
}
