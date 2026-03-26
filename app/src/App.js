import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {TaskList} from "./components/TaskList";

function App() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <header className="App-header">
            <h1 className={'home-title'}>TODO List</h1>
            </header>
            <main>
                <TaskList tasks={data.taches} />
            </main>
        </div>
    );
}

export default App;
