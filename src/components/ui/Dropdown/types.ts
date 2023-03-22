import { HTMLAttributes } from 'react'
import { ITodo } from "@store/todo/interface";

export type GenericDropdownItemProps = ITodo & Omit<HTMLAttributes<HTMLDivElement>, 'id'>