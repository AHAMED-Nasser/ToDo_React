import './SelectMode.css'

export function SelectMode({currentMode, onModeChange}) {
    return (
        <select
            value={currentMode}
            onChange={(e) => onModeChange(e.target.value)}
            className="select-mode"
        >
            <option value="all">Tout voir</option>
            <option value="task">Tâches</option>
            <option value="directory">Dossiers</option>
        </select>
    )
}