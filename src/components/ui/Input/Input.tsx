import { InputHTMLAttributes } from "react"
import { ICommonStyle } from '../../commin-style-types'

import cs from '../../CommonStyle.module.css'
import s from './Input.module.css'


const styles = s as unknown as IInputStyle
const commonStyle = cs as unknown as ICommonStyle

interface IInputStyle {
    Input: string
    Label: string
    Error: string
    PositionRelative: string
}

interface IInputProps {
    label?: string
    errorText?: string
}

export type InputProps = IInputProps & InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps): JSX.Element {
    const { label, errorText, ...rest} = props
    let labelClasses = styles.Label
    let errorClasses = styles.Error
    
    if (rest.disabled) {
        labelClasses += ' ' + commonStyle.Disabled
        errorClasses += ' ' + commonStyle.Disabled
    }
    
    return (
        <div className={styles.PositionRelative}>
            {label && <label className={labelClasses}>{label}</label>}
            <input className={styles.Input} {...rest} />
            {errorText && <p className={errorClasses}>{errorText}</p>}
        </div>
    )
}

