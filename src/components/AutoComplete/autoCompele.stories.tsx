import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import AutoComplete, {DataSourceType, AutoCompleteProps} from './autoComplete';

export default {
  title: 'Components/AutoComplete',
  component: AutoComplete,
} as Meta;

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

interface lakersProps {
  value: string,
  number: 1
}

export const Complete1: React.FC<AutoCompleteProps> = (props) => {

  const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0}
  ]

  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }

  const renderOption = (item: lakersProps) => {
    return (
      <>
        <span>Name: {item.value}</span>
        <span style={{paddingLeft: '10px'}}>Number: {item.number}</span>
      </>
    )
  }
  return (
    <AutoComplete
      placeholder='搜索一个湖人球员' 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

 (Complete1 as any).storyName = '自动补全input'

export const Complete2: React.FC<AutoCompleteProps> = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.length > 0 && Array.isArray(items) ? items.slice(0, 10).map((item: any) => ({ value: item.login, ...item})) : []
      })
  }

  const renderOption = (item: GithubUserProps) => {
    return (
      <>
        <span>Name: {item.login}</span>
        <span style={{paddingLeft: '10px'}}>url: {item.url}</span>
      </>
    )
  }
  
  return (
    <AutoComplete
      placeholder='搜索一个github的用户名' 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

(Complete2 as any).storyName = '异步接口调用';