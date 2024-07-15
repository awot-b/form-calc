// src/components/TextInput.tsx

import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from 'react-query';
import { useStore } from '../store/store'; // Adjust the path as per your project structure
import { AutocompleteItem } from '../store/types';
import { calculate } from '../utils';
import { Button } from '@mui/material';

export const isOperand = (value: string): boolean => {
  const operandsRegex = /[+\-*^/]/; 
  return operandsRegex.test(value);
};

const fetchAllSuggestions = async () => {
  const response = await fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const TextInput: React.FC<{ label: string }> = () => {
  const { addTag, tags, deleteLastTag } = useStore();
  const [inputValue, setInputValue] = useState('');
  const [reloadAutoComplete, setReloadAutoComplete] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null); // 
  
  const { data, isLoading } = useQuery('autocompleteAll', fetchAllSuggestions);

  const handleInputChange = (event: any, value: string | AutocompleteItem | null) => {
    if (value && typeof value === 'object' && 'name' in value) {
      console.log(value)
      addTag(value.name, value.value); 
      handeleClear()
    }
  };


  const handeleClear =()=>{
    setReloadAutoComplete(n=> !n)
    setInputValue('')
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [reloadAutoComplete]);
  
  const handleKeyDown = (event: any) => {
    if (event.key === 'Backspace' && !inputValue) {
        deleteLastTag()
    }
  };

  console.log(tags)

  return (
    <div className='flex flex-col space-y-2'>
 
 <div className='w-full items-center flex  border-2 p-4 rounded' key={reloadAutoComplete? 1:2}>
        <div className='flex'>{tags.map(tag=> isOperand(tag.content)? tag.content: <p className='bg-gray-200 whitespace-nowrap py-0 p-1'>{`${tag.content}   `} </p>)}</div>
          <div className='w-[200px]'>
            <Autocomplete
              freeSolo
              disableClearable
              autoFocus
              options={data || []}
              onKeyDown={handleKeyDown}
              loading={isLoading}
              inputValue={inputValue}
              getOptionLabel={(option: any) => (typeof option === 'string' ? option : option.name)}
              onChange={(event, value: any) => handleInputChange(event, value)}
              onInputChange={(event, newInputValue) => {
                if(isOperand(newInputValue)){
                    if(isOperand( tags[tags.length - 1]?.content)){deleteLastTag()}
                   addTag(`${newInputValue}`)
                   handeleClear()
                }
                else{
                    setInputValue(newInputValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  inputRef={inputRef}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                />
              )}
            />
            </div>
    </div>
      <p className='p-4'>Total: {calculate(tags)}</p>
    </div>
  );
};

export default TextInput;
