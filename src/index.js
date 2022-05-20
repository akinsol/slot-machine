import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GameHistory from './GameHistory';

function Welcome() {
    const[username, setUsername] = useState('');

    const loadGameHistory = () => {
        ReactDOM.render(
            <React.StrictMode>
                <GameHistory />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }

    const startGame = () => {
        if (username == '') {
            alert("Please enter a name.")
            return
        }
        alert("Welcome, " + username + "!");
        ReactDOM.render(
            <React.StrictMode>
                <App player={username}/>
            </React.StrictMode>,
            document.getElementById('root')
        )
    }

    return (
        <div id="homepage">
            <div id="player-start">
                <label for="username"> Enter Name: </label>
                <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <div>
                    <button id="start-game-button" onClick={() => startGame()}>Start</button>
                </div>
            </div>
            <button id="game-history-button" onClick={loadGameHistory}>Game History</button>
        </div>
    )
}

export default Welcome;
ReactDOM.render(
    <React.StrictMode>
        <Welcome />
    </React.StrictMode>,
    document.getElementById('root')
);

