import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import './AddTask.css';

export function AddTask({ onAddTask }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="add-task-btn" onClick={() => setShowModal(true)}>
                + Ajouter Tâche
            </button>

            {showModal && (
                <Modal title="Nouvelle Tâche" onClose={() => setShowModal(false)}>
                    <TaskForm onSubmit={onAddTask} onClose={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}