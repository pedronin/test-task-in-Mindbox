export type TypeTodoItem = {
  text: string;
  completed: boolean;
  id: string;
};

export interface ITodoSlice {
  items: TypeTodoItem[];
}

export enum EActiveListType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
