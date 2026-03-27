import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {TaskList} from "./components/TaskList";
import {UtilityBar} from "./components/UtilityBar";

function App() {

    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    // Recherche

    const filteredTasks = data.taches.filter(task => task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="App">
            <header className="App-header">
                <h1 className={'home-title'}>TODO List</h1>
            </header>
            <main>
                <UtilityBar onSearch={setSearch}/>
                <TaskList tasks={filteredTasks} />
            </main>
        </div>
    );
}

export default App;
