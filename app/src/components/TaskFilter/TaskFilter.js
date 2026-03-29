import './TaskFilter.css'

export function TaskFilter() {
    return (
        <select>
            <option value='all'>All</option>
            <option value='new'>Nouveau</option>
            <option value='in-process'>En cours</option>
            <option value='success'>Réussi</option>
            <option value='in-waiting'>En attente</option>
            <option value='give-up'>Abandonné</option>
        </select>
    )
}