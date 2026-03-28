import './TaskList.css';
export function TaskList({tasks}) {
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <strong className={'title-task'}>{task.title}</strong>
                    <p>Description : {task.description}</p>
                    <p>Date création : {task.date_creation}</p>
                    <p>Date échéance : {task.date_echeance}</p>
                    <p>Etat : {task.etat}</p>
                    <strong>Equipiers</strong>
                    {task.equipiers && task.equipiers.length > 0 ? (
                        <ul className={'team-list'}>
                            {task.equipiers.map((team) => (
                                <li key={team.name}>{team.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p><i>Aucun équipier</i></p>
                    )}

                </li>
            ))}
        </ul>
    )
}