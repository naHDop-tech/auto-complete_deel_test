import { HTMLAttributes, PropsWithChildren, useState, useEffect, useRef } from 'react'

import s from './DropdownStyle.module.css'
import { GenericDropdownItemProps } from './types'

const styles = s as unknown as IDropdownStyle

interface IDropdownStyle {
    Box: string
    Visible: string
    RelativeBlock: string
}

interface IAdditionDropdownProps {
    isOpen: boolean
    onSelect: (item: GenericDropdownItemProps) => void
    content: GenericDropdownItemProps[]
    component: (props: GenericDropdownItemProps) => JSX.Element
}

export type DropdownProps = IAdditionDropdownProps & Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>

export function Dropdown(props: PropsWithChildren<DropdownProps>) {
    const {
        component: Component,
        content,
        onClick,
        isOpen,
        onSelect,
        children,
        ...rest
    } = props
    const [width, setWidth] = useState(0);
    const parentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(parentRef.current?.clientWidth){
            setWidth(parentRef.current.offsetWidth)
        }
    }, [parentRef.current?.clientWidth]);
    
    let bosClasses = styles.Box
    
    if (isOpen) {
        bosClasses += ' ' + styles.Visible
    }

    return (
        <>
            <div ref={parentRef} onClick={onClick} className={styles.RelativeBlock}>
                {children}
            </div>
            <div style={{ width }} className={bosClasses} {...rest}>
                {content.map((item) => {
                    return (
                        <Component
                            key={item.title}
                            title={item.title}
                            onClick={() => onSelect(item)}
                        />
                    )
                })}
            </div>
        </>
    )
}