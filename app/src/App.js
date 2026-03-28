import logo from './logo.svg';
import {ETAT_TERMINE} from './stats.js';
import './App.css';
import {useEffect, useState} from "react";
import {TaskList} from "./components/TaskList/TaskList";
import {UtilityBar} from "./components/UtilityBar/UtilityBar";
import {FolderList} from "./components/FolderList/FolderList";

function App() {

    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('tache');

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) {
        return <div>Erreur dans le fichier JSON</div>;
    }

    // Recherche

    const filteredTasks = data.taches.filter(task => {
        const matchsSearch = task.title.toLowerCase().includes(search.toLowerCase());
        const isNotFinished = !ETAT_TERMINE.includes(task.etat);
        return matchsSearch && isNotFinished;
    });

    const filteredFolders = data.dossiers.filter(folder =>
        folder.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="App">
            <header className="App-header">
                <h1 className={'home-title'}>TODO List</h1>
            </header>
            <main>
                <UtilityBar
                    onSearch={setSearch}
                    currentMode={viewMode}
                    onModeChange={setViewMode}
                />
                {(viewMode === 'task' || viewMode === 'all') && (
                    <>
                        {viewMode === 'all' && <h2>Tâches</h2>}
                        <TaskList tasks={filteredTasks}/>
                    </>
                )}
                {(viewMode === 'directory' || viewMode === 'all') && (
                    <>
                        {viewMode === 'all' && <h2>Dossiers</h2>}
                        <FolderList folders={filteredFolders} />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
