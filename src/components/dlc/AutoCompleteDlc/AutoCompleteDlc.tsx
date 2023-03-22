import { Input } from '../../ui/Input'
import { Dropdown, GenericDropdownItemProps } from '../../ui/Dropdown'
import { USER_MENU } from "./static";

function Component(props: GenericDropdownItemProps) {
    const { title, onClick } = props
    return (
        <div style={{ cursor: 'pointer' }} onClick={onClick}>
            <p>{title}</p>
        </div>
    )
}


export function AutoCompleteDlc() {
    
    return (
        <Dropdown
            isOpen={true}
            component={Component}
            content={USER_MENU}
            onClick={() => null}
            onSelect={() => null}
        >
            <Input />
        </Dropdown>
    );
}
