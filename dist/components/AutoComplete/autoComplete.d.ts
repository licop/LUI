import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (str: DataSourceType) => void;
    renderOption?: (str: DataSourceType) => ReactElement | string;
}
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
