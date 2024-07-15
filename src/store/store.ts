// src/store.ts

import create from 'zustand';

export interface Tag {
  id: string;
  content: string;
  value?: number
  editMode: boolean
  xReplacedby: string
}

interface StoreState {
  tags: Tag[];
  operands: string[]; 
  editMode: boolean
  addTag: (content: string, val?: number) => void;
  removeTag: (id: string) => void;
  editTag: (id: string, content: string) => void;
  addOperand: (operand: string) => void;
  deleteLastTag:()=> void
  toggleEditMode: (id: string, xReplacedby?: string) => void
}

export const useStore = create<StoreState>((set) => ({
  tags: [],
  operands: [],
  addTag: (content, val) => set((state) => ( { tags: [  ...state.tags  , { id: Date.now().toString(), content, value: val, editMode:false, xReplacedby: '' }] }) ),
  removeTag: (id) => set((state) => ({ tags: state.tags.filter(tag => tag.id !== id) })),
  editTag: (id, content) => set((state) => ({
    tags: state.tags.map(tag => tag.id === id ? { ...tag, content } : tag)
  })),
  addOperand: (operand) => set((state) => ({ operands: [...state.operands, operand] })),
  deleteLastTag: ()=> set((state) => ({ tags: state.tags.slice(0, -1)})),
  editMode: false,
  toggleEditMode: (id, xReplacedby) => set((state) => ({
    tags: state.tags.map(tag => tag.id === id ? { ...tag, editMode: !tag.editMode, xReplacedby: xReplacedby ?? tag.xReplacedby  } : tag)
  })),
}));
