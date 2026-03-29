import React, { useState } from 'react';
import './TaskList.css';

export function TaskList({ tasks, folders, relations }) {
    // État pour gérer quelles tâches sont en "mode Complet" (ID des tâches dépliées)
    const [expandedTasks, setExpandedTasks] = useState([]);

    const toggleExpand = (taskId) => {
        setExpandedTasks(prev =>
            prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
        );
    };

    // Fonction pour obtenir les dossiers d'une tâche spécifique
    const getFoldersForTask = (taskId) => {
        const folderIds = relations
            .filter(rel => rel.tache === taskId)
            .map(rel => rel.dossier);
        return folders.filter(f => folderIds.includes(f.id));
    };

    return (
        <ul className="task-grid">
            {tasks.map(task => {
                const taskFolders = getFoldersForTask(task.id);
                const isExpanded = expandedTasks.includes(task.id);

                // Mode Simple : on ne garde que les 2 premiers dossiers
                const displayedFolders = isExpanded ? taskFolders : taskFolders.slice(0, 2);

                return (
                    <li key={task.id} className={`task-item-card ${isExpanded ? 'expanded' : ''}`}>
                        <div className="task-card-header">
                            <strong className="title-task">{task.title}</strong>
                            {/* Le triangle pour basculer de mode */}
                            <button
                                className={`expand-trigger ${isExpanded ? 'up' : 'down'}`}
                                onClick={() => toggleExpand(task.id)}
                            >
                                ▲
                            </button>
                        </div>

                        <p className="task-due-date">Échéance : {task.date_echeance}</p>

                        {/* Affichage des dossiers (badges colorés) */}
                        <div className="task-folders-list">
                            {displayedFolders.map(f => (
                                <span
                                    key={f.id}
                                    className="folder-badge"
                                    style={{ backgroundColor: f.color }}
                                >
                                    {f.title}
                                </span>
                            ))}
                            {!isExpanded && taskFolders.length > 2 && (
                                <span className="more-indicator">+{taskFolders.length - 2}</span>
                            )}
                        </div>

                        {/* Mode Complet : affiche la description */}
                        {isExpanded && (
                            <div className="task-full-details">
                                <hr />
                                <p className="task-description">
                                    {task.description || <i>Aucune description</i>}
                                </p>
                                <p className="task-status">État : <strong>{task.etat}</strong></p>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}