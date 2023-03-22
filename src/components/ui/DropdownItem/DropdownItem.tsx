import {PropsWithChildren} from "react";

import { GenericDropdownItemProps } from "../../ui/Dropdown";

export interface IDropdownItemProps {
    searchString: string
}

function DynamicBoldText({ text, shouldBeBold }: {text: string, shouldBeBold: string}) {
    const textArray = text.split(shouldBeBold);
    return (
        <span>
             {textArray.map((item, index) => (
                  <>
                      {item}
                      {index !== textArray.length - 1 && (
                          <b>{shouldBeBold}</b>
                      )}
                  </>
             ))}
        </span>
    );
}

export function DropdownItem(props: GenericDropdownItemProps & IDropdownItemProps) {
    const { title, onClick, searchString } = props

    return (
        <div style={{ cursor: 'pointer', fontWeight: 200 }} onClick={onClick}>
            <DynamicBoldText text={title} shouldBeBold={searchString}/>
        </div>
    )
}
