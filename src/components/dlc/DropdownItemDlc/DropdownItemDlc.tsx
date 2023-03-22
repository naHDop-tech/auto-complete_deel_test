import { useContext } from "react";
import { DropdownItem } from "../../ui/DropdownItem";
import { GenericDropdownItemProps } from "../../ui/Dropdown";
import { TodosContext } from "../../../contexts/todos";

export function DropdownItemDlc(props: GenericDropdownItemProps) {
    const { searchString } = useContext(TodosContext)
    
    return (
        <DropdownItem searchString={searchString} {...props} />
    )
}
