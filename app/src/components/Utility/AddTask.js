import '../../css/Utility/AddTask.css'
import {useState} from "react";

export function AddTask({ onAddTask }) {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskState, setTaskState] = useState("Nouveau");
    const [limitDate, setLimitDate] = useState(new Date().toLocaleDateString());

    const handleSubmit = (e) =>  {
        e.preventDefault();
        if (!title) return;

        const newTask = {
            id: Date.now(),
            title: title,
            description: description,
            date_creation: new Date().toLocaleDateString(),
            date_echeance: limitDate,
            etat: taskState,
            equipiers: []
        };

        onAddTask(newTask);
        setTitle("");
        setIsOpen(false);
    }

    return (
        <>
            <button type={'button'} onClick={() => setIsOpen(true)}>
                Créer une tâche
            </button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Nouvelle tâche</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Titre de la tâche..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                            />
                            <textarea
                                placeholder="Description de votre tâche"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                autoFocus
                            />
                            <input
                                type="date"
                                value={limitDate}
                                onChange={(e) => setLimitDate(e.target.value)}
                            />
                            <select onChange={(e) => setTaskState(e.target.value)}>
                                <option value="Nouveau">Nouveau</option>
                                <option value="En cours">En cours</option>
                                <option value="Réussi">Réussi</option>
                                <option value="En attente">En attente</option>
                                <option value="Abandonné">Abandonné</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="submit">Ajouter</button>
                                <button type="button" onClick={() => setIsOpen(false)}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}