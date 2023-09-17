import slice, { addTodo, removeTodo, clearComplete, toggleComplete } from '../slice';

const initialState = {
  items: [],
};

describe('slice', () => {
  it('redux slice: empty action type', () => {
    const result = slice(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('redux slice: addTodo', () => {
    const action = { type: addTodo.type, payload: 'text' };
    const result = slice(initialState, action);

    expect(result.items[0].text).toBe('text');
    expect(result.items[0].completed).toBe(false);
  });

  it('redux slice: removeTodo', () => {
    const state = {
      items: [
        {
          text: 'text',
          id: '1234',
          completed: false,
        },
      ],
    };
    const action = { type: removeTodo.type, payload: '1234' };
    const result = slice(state, action);

    expect(result).toEqual(initialState);
  });

  it('redux slice: toggleComplete', () => {
    const state = {
      items: [
        {
          text: 'text',
          id: '1234',
          completed: false,
        },
      ],
    };
    const action = { type: toggleComplete.type, payload: '1234' };
    const result = slice(state, action);

    expect(result.items[0].completed).toBe(true);
  });

  it('redux slice: clearComplete', () => {
    const state = {
      items: [
        {
          text: 'text',
          id: '1234',
          completed: false,
        },
        {
          text: 'text1',
          id: '5364',
          completed: true,
        },
        {
          text: 'text2',
          id: '2341',
          completed: false,
        },
        {
          text: 'text3',
          id: '3049',
          completed: true,
        },
      ],
    };
    const action = { type: clearComplete.type };
    const result = slice(state, action);

    result.items.forEach((el) => {
      expect(el.completed).toEqual(false);
    });
  });
});
