import { ChangeEvent, useContext, useEffect } from "react";

import { Input } from "../../ui/Input";
import { apiClient } from "../../../clients/api";
import { ITodo } from "../../../store/todo/interface";
import { GenericMSResponse } from "../../../clients/api/interface";
import { TodosContext } from "../../../contexts/todos";

export function InputDlc() {
    const { setTodos,  } = useContext(TodosContext)

    useEffect(() => {
        (async() => {
            const todos = await apiClient.get<ITodo, GenericMSResponse<ITodo[]>>('todos')
            if (todos.data?.length) {
                setTodos(todos.data)
            }
        })()
    }, [])
    
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    return (
        <Input onChange={changeHandler} />
    );
}
