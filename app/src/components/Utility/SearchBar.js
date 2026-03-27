import '../../css/Utility/SearchBar.css';
export function SearchBar({onSearchChange}) {
    return (
        <input
            type='text'
            placeholder='Rechercher un tâche ...'
            onChange={(e) => onSearchChange(e.target.value)}
            className='search-input'
        />
    )
}
