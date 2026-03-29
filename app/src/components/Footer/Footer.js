import React from 'react';
import { AddTask } from '../Utility/AddTask';
import './Footer.css';

export function Footer({ onAddTask, onAddFolder }) {
    return (
        <footer className="app-footer-bar">
            <AddTask onAddTask={onAddTask} onAddFolder={onAddFolder} />
        </footer>
    );
}