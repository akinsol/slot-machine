import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BiArrowBack, BiHistory} from "react-icons/bi";
import GameEntry from './GameEntry';
import Search from './Search';
import Welcome from './index';

const request = new XMLHttpRequest();

function GameHistory(){

  const [search, setSearch] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    request.open("GET", "http://127.0.0.1:8000/records/",true);
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

  const searchPlayers = () => {
    if (search == '') {
      alert("Please enter a name to search.")
      return
    }
    ReactDOM.render(
        <React.StrictMode>
          <Search query={search} />
        </React.StrictMode>,
        document.getElementById('root')
    )
  }

  const goBack=() => {
    ReactDOM.render(
        <React.StrictMode>
          <Welcome/>
        </React.StrictMode>,
        document.getElementById('root')
    )
  }

  return(
      <div>
        <div class="game-history">
          <BiArrowBack onClick={goBack} />
          <h2><BiHistory/> Game History</h2>
          <div id="searching">
            <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} required/>
            <button onClick={searchPlayers}>Search</button>
          </div>
          <div id="results">
            <table>
              <thead>
              <tr>
                <th>Session ID</th>
                <th>Player</th>
                <th>Date</th>
                <th>($) Earnings</th>
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
export default GameHistory;