import React, { useState } from 'react';
import {Button, Container, Form, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const api = {
  key: "31abf76e39ee93440a4a9df955bcdaf5",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    evt.preventDefault()
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <Container>
      <Form onSubmit={search}>
        <Form.Group controlId='searchBar'>
          <Form.Control 
            type="text" 
            placeholder="Search..."
            />
        </Form.Group>
        <Button variant='primary' type='submit'> Search </Button>
      </Form>
      {(weather.main) ? (
      <Card>
        <Card.Text className="location">{weather.name}, {weather.sys.country}</Card.Text>
        <Card.Text className="date">{dateBuilder(new Date())}</Card.Text>
        <Card.Text className="temp">{Math.round(weather.main.temp)}°c</Card.Text>
        <Card.Text className="weather">{weather.weather[0].main}</Card.Text>
      </Card>
      ) : ('')}
    </Container>
  );
}

export default App;