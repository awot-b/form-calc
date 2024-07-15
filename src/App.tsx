// src/App.tsx

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TextInput from './components/TextInput';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1 className='self-center text-xl font-semibold whitespace-nowrap dark:text-white bg-gray-800 h-[50px] flex items-center pl-4'>Form Calc</h1>
        <TextInput label="" />
      </div>
    </QueryClientProvider>
  );
};

export default App;
