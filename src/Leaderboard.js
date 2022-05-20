import GameEntry from './GameEntry';
import {useState, useEffect} from "react";

const request = new XMLHttpRequest();

function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    request.open("GET", "http://127.0.0.1:8000/leaderboard/",true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    request.onreadystatechange = getLeaderboard;
    request.send();
  },[]);


  const getLeaderboard = () => {
    if (request.readyState == 4 && request.status == 200) {
      let results = (JSON.parse(request.responseText));
      setLeaderboard(results);
    }
    else if (request.readyState == 4) {
      alert("Error: " + request.status + " " + request.statusText);
    }
  }

  return (
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
        {leaderboard.map((session) =>
            <GameEntry id={session.id}
                       player={session.player}
                       day={session.day}
                       earnings={session.earnings}
            />)
        }
        </tbody>
      </table>
  )
}

export default Leaderboard;