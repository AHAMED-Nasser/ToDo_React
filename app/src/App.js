import logo from './logo.svg';
import {ETAT_TERMINE} from './stats.js';
import './App.css';
import {useEffect, useState} from "react";
import {TaskList} from "./components/TaskList/TaskList";
import {UtilityBar} from "./components/UtilityBar/UtilityBar";
import {FolderList} from "./components/FolderList/FolderList";
import {Modal} from "./components/Modal/Modal";
import {FolderForm} from "./components/FolderForm/FolderForm";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";

function App() {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('all');
    const [folders, setFolders] = useState([]);
    const [relations, setRelations] = useState('');
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFolders(data.dossiers);
                setRelations(data.relations);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    // Fonctions CRUD

    // CREATE
    const addFolder = (newFolder) => {
        const folderWithId = { ...newFolder, id: Date.now() };
        setFolders([...folders, folderWithId]);
    };
    // UPDATE
    const updateFolder = (id, updatedFields) => {
        setFolders(folders.map(f => f.id === id ? { ...f, ...updatedFields } : f));
    };
    // DELETE
    const deleteFolder = (id) => {
        if (window.confirm("Supprimer ce dossier ?")) {
            setFolders(folders.filter(f => f.id !== id));
            setRelations(relations.filter(r => r.dossier !== id)); // Nettoyage des liens
        }
    };

    if (!data) {
        return <div>Erreur dans le fichier JSON</div>;
    }

    // Filtrage fichiers
    const filteredTasks = data.taches.filter(task => {
        const matchsSearch = task.title.toLowerCase().includes(search.toLowerCase());
        const isNotFinished = !ETAT_TERMINE.includes(task.etat);
        return matchsSearch && isNotFinished;
    });

    // Filtrache dossiers
    const filteredFolders = data.dossiers.filter(folder =>
        folder.title.toLowerCase().includes(search.toLowerCase())
    );

    const addTask = (newTask) => {
        const taskWithId = {
            ...newTask,
            id: Date.now(),
            date_creation: new Date().toLocaleDateString('fr-FR')
        };

        setData(prevData => ({
            ...prevData,
            taches: [...prevData.taches, taskWithId]
        }));
    };

    return (
        <div className="App">
            <header className="App-header">
                {data && <Header tasks={data.taches} />}
            </header>
            <main>
                <UtilityBar
                    onSearch={setSearch}
                    currentMode={viewMode}
                    onModeChange={setViewMode}
                    onAddTask={addTask}
                />
                {(viewMode === 'task' || viewMode === 'all') && (
                    <>
                        {viewMode === 'all' && <h2>Tâches</h2>}
                        <TaskList
                            tasks={filteredTasks}
                            folders={folders}
                            relations={relations}
                        />
                    </>
                )}

                {(viewMode === 'directory' || viewMode === 'all') && (
                    <>
                        <button onClick={() => setIsCreatingFolder(true)}>+ Ajouter Dossier</button>

                        {isCreatingFolder && (
                            <Modal title="Nouveau Dossier" onClose={() => setIsCreatingFolder(false)}>
                                <FolderForm onSubmit={addFolder} onClose={() => setIsCreatingFolder(false)} />
                            </Modal>
                        )}

                        <FolderList
                            folders={folders} // UTILISER L'ÉTAT DYNAMIQUE ICI
                            onUpdate={updateFolder}
                            onDelete={deleteFolder}
                            tasks={data.taches}
                            relations={data.relations}
                        />
                    </>
                )}
            </main>
            <Footer
                onAddTask={addTask}
                onAddFolder={addFolder}
            />
        </div>
    );
}

export default App;
