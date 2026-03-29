import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import {FolderForm} from '../FolderForm/FolderForm.js';
import './FolderList.css';

export function FolderList({ folders, onUpdate, onDelete, tasks, relations }) {
    const [selectedFolder, setSelectedFolder] = useState(null); // Pour le "Read"
    const [editingFolder, setEditingFolder] = useState(null);   // Pour l'Update

    // Fonction pour trouver les tâches liées à un dossier
    const getRelatedTasks = (folderId) => {
        const taskIds = relations
            .filter(rel => rel.dossier === folderId)
            .map(rel => rel.tache);
        return tasks.filter(t => taskIds.includes(t.id));
    };

    return (
        <div className="folder-list-container">
            <ul className="folder-grid">
                {folders.map(folder => (
                    <li key={folder.id} className="folder-item-card"
                        style={{ borderTop: `5px solid ${folder.color}` }}
                        onClick={() => setSelectedFolder(folder)} // "Read" au clic
                    >
                        <div className="folder-card-header">
                            <span className="folder-icon">{folder.icon || '📁'}</span>
                            <div className="folder-actions">
                                <button onClick={(e) => { e.stopPropagation(); setEditingFolder(folder); }}>Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); onDelete(folder.id); }}>Delete</button>
                            </div>
                        </div>
                        <strong className="folder-title">{folder.title}</strong>
                    </li>
                ))}
            </ul>

            {/* MODAL READ : Voir les tâches liées */}
            {selectedFolder && (
                <Modal title={`Dossier : ${selectedFolder.title}`} onClose={() => setSelectedFolder(null)}>
                    <p>{selectedFolder.description || "Aucune description"}</p>
                    <h3>Tâches dans ce dossier :</h3>
                    <ul>
                        {getRelatedTasks(selectedFolder.id).map(t => (
                            <li key={t.id}>{t.title}</li>
                        ))}
                    </ul>
                </Modal>
            )}

            {/* MODAL UPDATE : Formulaire de modification */}
            {editingFolder && (
                <Modal title="Modifier le dossier" onClose={() => setEditingFolder(null)}>
                    <FolderForm
                        initialData={editingFolder}
                        onSubmit={(updatedData) => onUpdate(editingFolder.id, updatedData)}
                        onClose={() => setEditingFolder(null)}
                    />
                </Modal>
            )}
        </div>
    );
}