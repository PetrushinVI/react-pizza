import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import {useDispatch} from "react-redux";
import {setSearchValue} from '../../redux/filter/slice';

export const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState<string>('');

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 1000),
        [],
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className={styles.root}>
            <input value={value} onChange={onChangeInput} className={styles.input} placeholder="Поиск пиццы..." />
        </div>
    );
};

