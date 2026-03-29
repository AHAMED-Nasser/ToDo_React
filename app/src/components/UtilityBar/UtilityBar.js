import {SearchBar} from "../SearchBar/SearchBar";
import './UtilityBar.css';
import {AddTask} from "../AddTask/AddTask";
import {SelectMode} from "../SelectMode/SelectMode";
import {TaskFilter} from "../TaskFilter/TaskFilter";
import {useState} from "react";

export function UtilityBar({onSearch, currentMode, onModeChange, onAddTask}) {
    const handleSearch = (value) => {
        onSearch(value);
    }

    return (
        <div className={'utility-bar'}>
            <div>
                <SearchBar onSearchChange={handleSearch} />
                <AddTask onAddTask={onAddTask} />
                <SelectMode
                    currentMode={currentMode}
                    onModeChange={onModeChange}
                />
                <TaskFilter />
            </div>
        </div>
    )
}