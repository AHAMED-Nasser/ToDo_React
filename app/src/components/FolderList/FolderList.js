import './FolderList.css';

export function FolderList({ folders }) {
    return (
        <div className="folder-list-container">
            <ul className="folder-grid">
                {folders.map(folder => (
                    <li key={folder.id} className="folder-item-card" style={{ borderTop: `5px solid ${folder.color}` }}>
                        <div className="folder-icon">{folder.icon || '📁'}</div>
                        <strong className="folder-title">{folder.title}</strong>
                        <p className="folder-description">{folder.description || <i>Aucune description</i>}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}