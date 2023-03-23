import { GenericDropdownItemProps } from "../../ui/Dropdown";

export interface IDropdownItemProps {
    searchString: string
}

function DynamicBoldText({ text, shouldBeBold }: {text: string, shouldBeBold: string}) {
    const textArray = text.split(shouldBeBold);
    return (
        <>
             {textArray.map((item, index) => (
                  <span key={index}>
                      {item}
                      {index !== textArray.length - 1 && (
                          <b>{shouldBeBold}</b>
                      )}
                  </span>
             ))}
        </>
    );
}

export function DropdownItem(props: GenericDropdownItemProps & IDropdownItemProps) {
    const { title, onClick, searchString } = props

    return (
        <div style={{ padding: '6px 0', borderTop: '0.2px solid rgba(255,255,255, 0.1)', cursor: 'pointer', fontWeight: 200 }} onClick={onClick}>
            <DynamicBoldText text={title} shouldBeBold={searchString}/>
        </div>
    )
}
