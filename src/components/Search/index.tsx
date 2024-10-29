import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss'
import {useDispatch} from "react-redux";
import {setSearchValue} from '../../redux/filter/slice'

const Search: React.FC = () => {
    const dispatch = useDispatch;
    const [value, setValue] = React.useState('');

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 1000),
        [],
    );

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <input value={value} onChange={onChangeInput} className={styles.root} placeholder="Поиск пиццы ... " />
    );
};

export default Search;