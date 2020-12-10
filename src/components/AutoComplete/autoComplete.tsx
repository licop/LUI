import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import { render } from 'react-dom';

interface DataSourceObject {
    value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject;
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>,
    onSelect?: (str: DataSourceType) => void,
    renderOption?: (str: DataSourceType) => ReactElement | string
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props;

    const [inputValue,  setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]); 
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
          onSelect(item)
        }
      }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        if(value) {
            const results = fetchSuggestions(value);
            if(results instanceof Promise) {
                results.then(data => {
                    setSuggestions(data);
                })
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([])
        }
    }
    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    return <li key={index} onClick={() => handleSelect(item)}>
                        {renderTemplate(item)}
                    </li>
                })}
            </ul>
        )
    }
    const renderTemplate = (item: any) => {
        return renderOption ? renderOption(item) : item.value;
    }
    return (
        <div className="lui-auto-complete">
            <Input 
                value={inputValue}
                onChange={handleChange}
                {...restProps}
            />
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
}

export default AutoComplete;



