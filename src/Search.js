import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BiSearch, BiArrowBack} from "react-icons/bi";
import GameEntry from './GameEntry';
import GameHistory from './GameHistory';

const request = new XMLHttpRequest();

function Search(props) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    request.open("GET", "http://127.0.0.1:8000/search/" + props.query,true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    request.onreadystatechange = getRecords;
    request.send();
  }, []);

  const getRecords = () => {
    if (request.readyState === 4 && request.status === 200) {
      let results = (JSON.parse(request.responseText));
      setRecords(results);
    }
    else if (request.readyState === 4) {
      alert("Error: " + request.status + " " + request.statusText);
    }
  }

  const goBack = () => {
    ReactDOM.render(
        <React.StrictMode>
          <GameHistory />
        </React.StrictMode>,
        document.getElementById('root')
    )
  }

  return(
      <div>
        <div class="game-history">
          <BiArrowBack onClick={goBack} />
          <h2><BiSearch />Search Results</h2>
          <div id="results">
            <table>
              <thead>
              <tr>
                <th>Session ID</th>
                <th>Player</th>
                <th>Date</th>
                <th>Earnings</th>
              </tr>
              </thead>
              <tbody>
              {records.map((session) =>
                  <GameEntry id={session.id}
                             player={session.player}
                             day={session.day}
                             earnings={session.earnings}
                  />)
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default Search;