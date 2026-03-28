import './TaskList.css';
import {Modal} from '../Modal/Modal.js';
import {useState} from "react";
export function TaskList({tasks}) {

    const [selectedTask, setSelectedTask] = useState(null);

    const handleCloseModal = () => {
        setSelectedTask(null);
    }

    return (
        <div className="task-list-container">
            {/* GRILLE DES TÂCHES */}
            <ul className="task-grid">
                {tasks.map(task => (
                    // On ajoute un écouteur de clic sur le <li>
                    <li key={task.id} className="task-item-card" onClick={() => setSelectedTask(task)}>
                        <strong className={'title-task'}>{task.title}</strong>
                        {/* Affiche la description (Tronquée si trop longue) */}
                        <p className="task-description-excerpt">
                            {task.description ? task.description : <i>Pas de description</i>}
                        </p>
                        <span className={`status-badge status-${task.etat.toLowerCase().replace(" ", "-")}`}>
                            {task.etat}
                        </span>
                    </li>
                ))}
            </ul>

            {/* MODAL DE DÉTAIL (Affiche uniquement si selectedTask n'est pas null) */}
            {selectedTask && (
                <Modal
                    title={`Détails de la tâche : ${selectedTask.title}`}
                    onClose={handleCloseModal}>
                    <div className="task-details-complete">
                        <p><strong>Identifiant :</strong> {selectedTask.id}</p>
                        <p><strong>Description :</strong> {selectedTask.description || <i>Pas de description.</i>}</p>
                        <p><strong>Date création :</strong> {selectedTask.date_creation}</p>
                        <p><strong>Date échéance :</strong> {selectedTask.date_echeance}</p>
                        <p>
                            <strong>Etat : </strong>
                            <span className={`status-badge status-${selectedTask.etat.toLowerCase().replace(" ", "-")}`}>
                                {selectedTask.etat}
                            </span>
                        </p>

                        <strong>Equipiers :</strong>
                        {selectedTask.equipiers && selectedTask.equipiers.length > 0 ? (
                            <ul className={'team-list-complete'}>
                                {selectedTask.equipiers.map((team) => (
                                    <li key={team.name} className="team-member-badge">{team.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p><i>Aucun équipier</i></p>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    )
}