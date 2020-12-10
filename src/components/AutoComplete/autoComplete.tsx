import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce'

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
    const [isLoading, setLoading] = useState(false)
    const [inputValue,  setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]); 
    const debounceValue = useDebounce(inputValue, 500)
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
          onSelect(item)
        }
    }

    useEffect(() => {
        if(debounceValue) {
            const results = fetchSuggestions(debounceValue);
            if(results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setLoading(false);
                    setSuggestions(data);
                })
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([])
        }
    }, [debounceValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);

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
            { isLoading &&
                <ul><Icon icon="spinner" spin/></ul>
            }
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
}

export default AutoComplete;
