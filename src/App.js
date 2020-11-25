import { React, useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";

import Button from "@material-ui/core/Button";
import api from "./utils/Api";
import Character from "./Components/Character";
import "./App.css";

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: 10,
  },
  title: {
    fontSize: 16,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
});

function App() {
  const [cards, setCards] = useState([]);
  const [planets, setPlanets] = useState([]);
  const date = new Date();
  const classes = useStyles();

  useEffect(() => {
    api.getInitialCards()
    .then(items => {
      setCards(items.results)
    })
    api.getPlanets()
    .then(items => {
      console.log(items.results);
      const newItems = items.results.map(item => {
        return item = item.name
      })
      setPlanets(newItems)
    })
  }, []);

  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar className="toolbar">
            <Typography variant="h6">Swapi APP</Typography>
            <Button size="medium" color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <main className="main">
          {cards.map((card, idx) => {
            return (
              <Card className={classes.root} key={card.created}>
                <Link to={`/character/${idx + 1}`} className={classes.link}>
                  <CardContent>
                    <Typography
                      component="h2"
                      variant="h6"
                      className={classes.title}
                    >
                      {card.name}
                    </Typography>
                    <Typography component="p">Gender: {card.gender}</Typography>
                    <Typography component="p">
                      Homeworld:{" "}
                      
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </main>
        <footer>{date.getFullYear()} © SWAPi by Nikita Galtsev</footer>
      </Router>
    </div>
  );
}

export default App;
