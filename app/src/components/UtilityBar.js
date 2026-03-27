import {SearchBar} from "./Utility/SearchBar";
import '../css/UtilityBar.css';
import {AddTask} from "./Utility/AddTask";
import {SelectMode} from "./Utility/SelectMode";
import {TaskFilter} from "./Utility/TaskFilter";
import {useState} from "react";

export function UtilityBar({onSearch}) {
    const handleSearch = (value) => {
        onSearch(value);
    }

    return (
        <div className={'utility-bar'}>
            <div>
                <SearchBar onSearchChange={handleSearch} />
                <AddTask />
                <SelectMode />
                <TaskFilter />
            </div>
        </div>
    )
}