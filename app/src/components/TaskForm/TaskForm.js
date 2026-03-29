import React, { useState } from 'react';
import './TaskForm.css';

export function TaskForm({ onSubmit, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Critère : Intitulé 5 caractères minimum
        if (title.trim().length < 5) {
            alert("L'intitulé doit faire au moins 5 caractères.");
            return;
        }

        onSubmit({
            title,
            description,
            date_echeance: dueDate,
            etat: "Nouveau", // Statut par défaut
            equipiers: []    // Tableau vide par défaut
        });
        onClose();
    };

    return (
        <form onSubmit={handleFormSubmit} className="task-form">
            <div className="form-group">
                <label>Titre (5 min) *</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Date d'échéance *</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
            </div>
            <div className="form-actions">
                <button type="button" onClick={onClose}>Annuler</button>
                <button type="submit" className="btn-primary">Créer la tâche</button>
            </div>
        </form>
    );
}