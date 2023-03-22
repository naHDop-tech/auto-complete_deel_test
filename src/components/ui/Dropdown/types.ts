import { HTMLAttributes } from 'react'

export interface IAdditionDropdownProps {
    title: string
}

export type GenericDropdownItemProps = IAdditionDropdownProps & HTMLAttributes<HTMLDivElement>