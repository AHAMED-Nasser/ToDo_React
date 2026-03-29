import React from 'react';
import './Modal.css';

// Ce composant est générique : il prend un titre, un contenu et une fonction pour se fermer.
export function Modal({ title, children, onClose }) {
    // Si l'utilisateur clique sur le fond sombre (l'overlay), on ferme la modal.
    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}