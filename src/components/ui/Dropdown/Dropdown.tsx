import { HTMLAttributes, PropsWithChildren, useState, useEffect, RefObject } from 'react'

import s from './DropdownStyle.module.css'
import { GenericDropdownItemProps } from './types'
import { ITodo } from "@store/todo/interface";

const styles = s as unknown as IDropdownStyle

interface IDropdownStyle {
    Box: string
    Visible: string
    RelativeBlock: string
}

interface IAdditionDropdownProps {
    isOpen: boolean
    onSelect: (item: ITodo) => void
    content: ITodo[]
    component: (props: GenericDropdownItemProps) => JSX.Element
    parentRef: RefObject<HTMLDivElement>
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
        parentRef,
        ...rest
    } = props
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if(parentRef.current?.clientWidth){
            setWidth(parentRef.current.offsetWidth)
        }
    }, [parentRef, parentRef.current?.clientWidth]);
    
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
                {content.map((item, idx) => {
                    return (
                        <Component
                            completed={item.completed}
                            id={item.id}
                            userId={item.userId}
                            key={idx}
                            title={item.title}
                            onClick={() => onSelect(item)}
                        />
                    )
                })}
            </div>
        </>
    )
}