import React, { useState } from 'react';
import './FolderForm.css';

export function FolderForm({ onSubmit, initialData = {}, onClose }) {
    // Initialisation de l'état avec les données existantes (pour modification) ou vides (pour création)
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        color: initialData.color || 'orange',
        icon: initialData.icon || '📁',
        type: initialData.type || ''
    });

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Critère d'acceptation : Intitulé (string, 3 caractères minimum)
        if (formData.title.trim().length < 3) {
            setError('Le titre doit contenir au moins 3 caractères.');
            return;
        }

        onSubmit(formData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="folder-form">
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
                <label>Titre *</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ex: Projet React"
                    required
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Optionnel..."
                />
            </div>

            <div className="form-group">
                <label>Couleur</label>
                <select
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                >
                    <option value="orange">Orange</option>
                    <option value="pink">Rose</option>
                    <option value="bluesky">Bleu ciel</option>
                    <option value="green">Vert</option>
                    <option value="red">Rouge</option>
                    <option value="purple">Violet</option>
                    <option value="yellow">Jaune</option>
                    <option value="grey">Gris</option>
                    <option value="brown">Marron</option>
                    <option value="cyan">Cyan</option>
                </select>
            </div>

            <div className="form-group">
                <label>Pictogramme (Texte/Emoji)</label>
                <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    placeholder="Ex: 📁 ou Work"
                />
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
                <button type="submit" className="btn-submit">Enregistrer</button>
            </div>
        </form>
    );
}