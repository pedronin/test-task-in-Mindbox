import React from 'react';
import styles from './TodoItem.module.scss';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { completedTodo, removeTodo } from '../../redux/todo/slice';
import { TypeTodoItem } from '../../redux/todo/type';

interface ITodoItem {
  item: TypeTodoItem;
}

const TodoItem: React.FC<ITodoItem> = ({ item }) => {
  const dispatch = useAppDispatch();
  return (
    <li
      onClick={() => dispatch(completedTodo(item.text))}
      className={`${styles.todo__item} ${item.completed ? `${styles.completed}` : ''}`}>
      <input
        checked={item.completed}
        onChange={() => {}}
        className={styles.todo__checkbox}
        type="checkbox"
      />
      <p className={styles.todo__text}>{item.text}</p>
      <button
        onClick={() => dispatch(removeTodo(item.text))}
        className={`${styles.todo__delete} ${styles.btn}`}>
        &#215;
      </button>
    </li>
  );
};

export default TodoItem;
