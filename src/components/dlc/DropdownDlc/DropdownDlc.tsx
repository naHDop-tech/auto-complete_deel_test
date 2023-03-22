import { useCallback, useContext, useEffect, useRef } from "react";

import { Dropdown } from '../../ui/Dropdown'
import { InputDlc } from "../InputDlc";
import { TodosContext } from "../../../contexts/todos";
import { ITodo } from "../../../store/todo/interface";
import { DropdownItemDlc } from "../../dlc/DropdownItemDlc";

export function DropdownDlc() {
    const parentRef = useRef<HTMLDivElement>(null)
    const {
        todos,
        setTodo,
        isDropdownOpen, 
        setIsDropdownOpen,
        todo,
        setTodos
    } = useContext(TodosContext)
 
    const onClickHandler = useCallback(() => {
        if (todo) {
            setTodos([todo])
        }
        setIsDropdownOpen((s) => !s)
    }, [todo, todos])

    const onSelectHandler = (todo: ITodo) => {
        // Should not been closed manually 
        // because it has closed by event listener
        setTodo(todo)
    }

    // Outside click
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (parentRef.current && !parentRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <Dropdown
            parentRef={parentRef}
            isOpen={isDropdownOpen}
            component={DropdownItemDlc}
            content={todos}
            onClick={onClickHandler}
            onSelect={onSelectHandler}
        >
            <InputDlc />
        </Dropdown>
    );
}
