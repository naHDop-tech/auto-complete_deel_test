import { useContext } from "react";

import { DropdownItem } from "@components/ui/DropdownItem";
import { GenericDropdownItemProps } from "@components/ui/Dropdown";
import { TodosContext } from "@root/contexts/todos";

export function DropdownItemDlc(props: GenericDropdownItemProps) {
    const { searchString } = useContext(TodosContext)
    
    return (
        <DropdownItem searchString={searchString} {...props} />
    )
}
