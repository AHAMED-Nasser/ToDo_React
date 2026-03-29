import React from 'react';
import './Header.css';

export function Header({ tasks }) {
    // 1. Calcul des statistiques de base
    const totalTasks = tasks.length;
    // Les tâches "non finies" sont celles dont l'état n'est ni "Réussi" ni "Abandonné"
    const unfinishedTasks = tasks.filter(t => !["Réussi", "Abandonné"].includes(t.etat)).length;

    // 2. Calcul pour le camembert (Répartition par état)
    const statsByEtat = tasks.reduce((acc, task) => {
        acc[task.etat] = (acc[task.etat] || 0) + 1;
        return acc;
    }, {});

    // Génération du style pour le camembert via conic-gradient
    const generatePieStyle = () => {
        if (totalTasks === 0) return { background: '#eee' };

        let cumulativePercent = 0;
        const colors = {
            "Nouveau": "#3498db",
            "En attente": "#f1c40f",
            "Réussi": "#2ecc71",
            "Abandonné": "#e74c3c"
        };

        const gradientParts = Object.keys(statsByEtat).map(etat => {
            const percent = (statsByEtat[etat] / totalTasks) * 100;
            const start = cumulativePercent;
            cumulativePercent += percent;
            return `${colors[etat] || '#ccc'} ${start}% ${cumulativePercent}%`;
        });

        return {
            background: `conic-gradient(${gradientParts.join(', ')})`
        };
    };

    return (
        <header className="app-header">
            <div className="header-info">
                <h1 className="home-title">TODO List</h1>
                <div className="counters">
                    <p>Total : <strong>{totalTasks}</strong></p>
                    <p>En cours : <strong>{unfinishedTasks}</strong></p>
                </div>
            </div>

            {/* Option Camembert : Répartition par Etat */}
            <div className="stats-container">
                <div className="pie-chart" style={generatePieStyle()}></div>
                <ul className="legend">
                    {Object.keys(statsByEtat).map(etat => (
                        <li key={etat}>
                            <span className={`dot status-${etat.toLowerCase().replace(/\s/g, '-')}`}></span>
                            {etat} : {Math.round((statsByEtat[etat] / totalTasks) * 100)}%
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}