import './SelectMode.css'

export function SelectMode() {
    return (
        <select>
            <option value="task-mode">Mode tâche</option>
            <option value="directory-mode">Mode dossier</option>
        </select>
    )
}