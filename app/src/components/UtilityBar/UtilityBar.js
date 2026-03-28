import {SearchBar} from "../SearchBar/SearchBar";
import './UtilityBar.css';
import {AddTask} from "../AddTask/AddTask";
import {SelectMode} from "../SelectMode/SelectMode";
import {TaskFilter} from "../TaskFilter/TaskFilter";
import {useState} from "react";

export function UtilityBar({onSearch, currentMode, onModeChange}) {
    const handleSearch = (value) => {
        onSearch(value);
    }

    return (
        <div className={'utility-bar'}>
            <div>
                <SearchBar onSearchChange={handleSearch} />
                <AddTask />
                <SelectMode
                    currentMode={currentMode}
                    onModeChange={onModeChange}
                />
                <TaskFilter />
            </div>
        </div>
    )
}