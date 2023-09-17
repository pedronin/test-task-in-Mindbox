import React from 'react';
import styles from './TodoItem.module.scss';
import { useAppDispatch } from '../../Hook/redux';
import { toggleComplete, removeTodo } from '../../redux/slice';
import { TypeTodoItem } from '../../redux/types';

interface ITodoItem {
  item: TypeTodoItem;
}

const TodoItem: React.FC<ITodoItem> = React.memo(({ item }) => {
  const dispatch = useAppDispatch();

  const onClickToggleComplete = () => {
    dispatch(toggleComplete(item.id));
  };

  const onClickRemoveTodo = () => {
    dispatch(removeTodo(item.id));
  };

  return (
    <li
      onClick={onClickToggleComplete}
      className={`${styles.todo__item} ${item.completed ? `${styles.completed}` : ''}`}>
      <input
        checked={item.completed}
        onChange={() => {}}
        className={styles.todo__checkbox}
        type="checkbox"
      />
      <p className={`${styles.todo__text}  ${item.completed ? `${styles.completed}` : ''}`}>
        {item.text}
      </p>
      <button onClick={onClickRemoveTodo} className={`${styles.todo__delete} ${styles.btn}`}>
        &#215;
      </button>
    </li>
  );
});

export default TodoItem;
