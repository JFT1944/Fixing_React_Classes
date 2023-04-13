import React, { useEffect, useState } from "react";
import axios from "axios";
import Joke from "./Joke1";
import "./JokeList.css";

/** List of jokes. */

function JokeList(props){
  // static defaultProps = {
  //   numJokesToGet: 5
  // };
// let {jokes, isLoading} = props

const [numJokesToGet, gettingNumJokesToGet] = useState(5)
const [jokes, getNewJokes] = useState([])
const [isLoading, getIsLoading] = useState(true)


    // this.generateNewJokes = this.generateNewJokes.bind(this);
    // this.vote = this.vote.bind(this);
  

useEffect(()=>{
  console.log('uploading')
  getJokes()
}, [])

  /* at mount, get jokes */

  // componentDidMount() {
  //   this.getJokes();
  // }

  /* retrieve jokes from API */

  async function getJokes() {
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      let jokes = [];
      let seenJokes = new Set();

      while (jokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          jokes.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }


      getNewJokes((oldJ) => {
        oldJ = jokes
        console.log(oldJ)
        return oldJ
      })
      getIsLoading(false)
      // this.setState({ jokes, isLoading: false });
    } catch (err) {
      console.error(err);
    }
  }

  /* empty joke list, set to loading state, and then call getJokes */

function generateNewJokes() {
    getIsLoading(true)
    getJokes()
  }

  /* change vote for this id by delta (+1 or -1)2 */

  // function vote(id, delta) {
  //   getNewJokes(st => ({
  //     jokes: st.jokes.map(j =>
  //       j.id === id ? { ...j, votes: j.votes + delta } : j
  //     )
  //   }));
  // }
  function vote(id, delta) {
    getNewJokes((st) => {
      console.log('clicked')
      console.log(st)
      return st.map((j) => j.id === id ? { ...j, votes: j.votes + delta } : j)

    });
  }

  /* render: either loading spinner or list of sorted jokes. */










console.log(jokes)
    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    if (isLoading) {
      return (
        <div className="loading">
          <i className="fas fa-4x fa-spinner fa-spin" />
        </div>
      )
    }

    return (
      <div className="JokeList">
        <button
          
          className="JokeList-getmore"
          onClick={(e) => generateNewJokes()}
        >
          Get New Jokes
        </button>

        {sortedJokes.map(j => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))}
      </div>
    );
        }
export default JokeList;
