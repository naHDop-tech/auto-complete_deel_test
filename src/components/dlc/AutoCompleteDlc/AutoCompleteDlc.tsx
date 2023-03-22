import {useEffect, useRef, useState} from "react";

import { Input } from '../../ui/Input'
import { Dropdown, GenericDropdownItemProps } from '../../ui/Dropdown'
import { ITodo } from "../../../store/todo/interface";
import { apiClient } from "../../../clients/api";
import {GenericMSResponse} from "@root/clients/api/interface";

function Component(props: GenericDropdownItemProps) {
    const { title, onClick } = props
    return (
        <div style={{ cursor: 'pointer' }} onClick={onClick}>
            <p>{title}</p>
        </div>
    )
}

export function AutoCompleteDlc() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [defaultDotos, setDefaultTodos] = useState<ITodo[]>([])
    const parentRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        (async() => {
            const todos = await apiClient.get<ITodo, GenericMSResponse<ITodo[]>>('todos')
            if (todos.data?.length) {
                setDefaultTodos(todos.data)
            }
        })()
    }, [])

    const onClickHandler = () => {
        if (defaultDotos.length) {
            setIsDropdownOpen((s) => !s)
        }
    }

    const onSelectHandler = (e: any) => {
        console.log(e)
        setIsDropdownOpen(false)
    }

    // Outside click
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (parentRef.current && !parentRef.current.contains(event.target)) {
                onClickHandler && onClickHandler()
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClickHandler ]);

    return (
        <Dropdown
            parentRef={parentRef}
            isOpen={isDropdownOpen}
            component={Component}
            content={defaultDotos}
            onClick={onClickHandler}
            onSelect={onSelectHandler}
        >
            <Input />
        </Dropdown>
    );
}
