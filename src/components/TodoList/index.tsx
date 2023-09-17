import React from 'react';

import styles from './TodoList.module.scss';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { addTodo, clearComplete } from '../../redux/slice';
import TodoItem from '../TodoItem';
import { EActiveListType } from '../../redux/types';

const Todo: React.FC = () => {
  const dispatch = useAppDispatch();
  const [outValue, setOutValue] = React.useState('');
  const [activeListType, setActiveListType] = React.useState(EActiveListType.ALL);

  const { items } = useAppSelector((state) => state.todo);

  React.useEffect(() => {
    function handlerEnter(e: KeyboardEvent) {
      if (e.code === 'Enter') {
        onClickAddTodo();
      }
    }
    document.addEventListener('keydown', handlerEnter);
    return () => document.removeEventListener('keydown', handlerEnter);
  }, [outValue]);

  // фильтрация заметок согласно выбраному разделу (all/active/completed)
  const currentItems = React.useMemo(() => {
    switch (activeListType) {
      case EActiveListType.ALL:
        return items;
      case EActiveListType.ACTIVE:
        return items.filter((item) => item.completed === false);
      case EActiveListType.COMPLETED:
        return items.filter((item) => item.completed === true);
    }
  }, [activeListType, items]);

  const onClickAddTodo = () => {
    dispatch(addTodo(outValue));
    setOutValue('');
    setActiveListType(EActiveListType.ALL);
  };

  const onClickClearComplete = () => {
    dispatch(clearComplete());
    setActiveListType(EActiveListType.ALL);
  };

  const onClickAll = () => setActiveListType(EActiveListType.ALL);
  const onClickActive = () => setActiveListType(EActiveListType.ACTIVE);
  const onClickCompleted = () => setActiveListType(EActiveListType.COMPLETED);

  const onChangeOutValue = (e: React.ChangeEvent<HTMLInputElement>) => setOutValue(e.target.value);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>todos</h2>
      <div className={styles.todo}>
        <div className={styles.todo__input}>
          <input
            onChange={onChangeOutValue}
            value={outValue}
            className={styles.todo__out}
            type="text"
            placeholder="What needs to be done"
          />
          <button onClick={onClickAddTodo} className={`${styles.todo__add} ${styles.btn}`}>
            +
          </button>
        </div>
        <div className={styles.todo_wrapper}>
          <ul className={styles.todo__list}>
            {currentItems.map((item) => (
              <TodoItem item={item} key={item.id} />
            ))}
          </ul>
        </div>
        <div className={styles.todo__bottom}>
          <div className={styles.todo__items_left}>{currentItems.length} items left</div>
          <div className={styles.todo__bottom_wrapper}>
            <button
              onClick={onClickAll}
              className={`${styles.todo__all_btn} ${styles.btn__bottom} ${
                activeListType === EActiveListType.ALL ? styles.active : ''
              }`}>
              All
            </button>
            <button
              onClick={onClickActive}
              className={`${styles.todo__active_btn} ${styles.btn__bottom} ${
                activeListType === EActiveListType.ACTIVE ? styles.active : ''
              }`}>
              Active
            </button>
            <button
              onClick={onClickCompleted}
              className={`${styles.todo__completed_btn} ${styles.btn__bottom} ${
                activeListType === EActiveListType.COMPLETED ? styles.active : ''
              }`}>
              Completed
            </button>
          </div>
          <button
            onClick={onClickClearComplete}
            className={`${styles.todo__clear_btn} ${styles.btn__bottom}`}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
