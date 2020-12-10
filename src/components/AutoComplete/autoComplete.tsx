import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
import { render } from 'react-dom';


interface DataSourceObject {
    value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
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
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const [ showDropdown, setShowDropdown] = useState(false)
    const debounceValue = useDebounce(inputValue, 500);
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if (onSelect) {
          onSelect(item)
        }
        triggerSearch.current = false;
    }
    useClickOutside(componentRef, () => {setSuggestions([])});
    useEffect(() => {
        if(debounceValue && triggerSearch.current) {
            const results = fetchSuggestions(debounceValue);
            if(results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setLoading(false);
                    setSuggestions(data);

                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setSuggestions(results);
                if (results.length > 0) {
                    setShowDropdown(true)
                }
            }
        } else {
            setShowDropdown(false)
        }
        setHighlightIndex(-1);
    }, [debounceValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    }
    
    const highlight = (index: number) => {
        if(index < 0) index = 0;
        if(index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13: 
                if(suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break;
            case 38:
                highlight(highlightIndex - 1)
                break;
            case 40: 
                highlight(highlightIndex + 1)
                break;
            case 27:
                setShowDropdown(false)
                break;
            default:
                break;

        }
    }

    const generateDropdown = () => {
        return (
            <Transition
                in={showDropdown || isLoading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => {setSuggestions([])}}
            >
                <ul className="lui-suggestion-list">
                    { isLoading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin/>
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    })}
                </ul>
            </Transition> 
        )
    }

    const renderTemplate = (item: any) => {
        return renderOption ? renderOption(item) : item.value;
    }

    return (
        <div className="lui-auto-complete" ref={componentRef}>
            <Input 
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            
            {generateDropdown()}
        </div>
    )
}

export default AutoComplete;
