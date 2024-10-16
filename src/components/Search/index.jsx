import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss'
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";

const Search = () => {
    const dispatch = useDispatch;
    const [value, setValue] = React.useState('');

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 1000),
        [],
    );

    const onChangeInput = event => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <input value={value} onChange={onChangeInput} className={styles.root} placeholder="Поиск пиццы ... " />
    );
};

export default Search;