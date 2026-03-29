import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { FolderForm } from '../FolderForm/FolderForm';
import '../AddTask/AddTask.css';

export function AddTask({ onAddTask, onAddFolder }) {
    const [modalType, setModalType] = useState(null); // 'task', 'folder' ou null

    return (
        <div className="add-task-container">
            {/* Bouton "+" flottant ou fixe selon votre CSS */}
            <button className="main-add-btn" onClick={() => setModalType('selection')}>+</button>

            {modalType === 'selection' && (
                <Modal title="Que voulez-vous ajouter ?" onClose={() => setModalType(null)}>
                    <div className="add-selection-menu">
                        <button onClick={() => setModalType('task')}>Nouvelle Tâche</button>
                        <button onClick={() => setModalType('folder')}>Nouveau Dossier</button>
                    </div>
                </Modal>
            )}

            {modalType === 'task' && (
                <Modal title="Créer une Tâche" onClose={() => setModalType(null)}>
                    <TaskForm
                        onSubmit={onAddTask}
                        onClose={() => setModalType(null)}
                    />
                </Modal>
            )}

            {modalType === 'folder' && (
                <Modal title="Créer un Dossier" onClose={() => setModalType(null)}>
                    <FolderForm
                        onSubmit={onAddFolder}
                        onClose={() => setModalType(null)}
                    />
                </Modal>
            )}
        </div>
    );
}