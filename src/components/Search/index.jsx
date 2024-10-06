import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss'
import {SearchContext} from "../../App";

const Search = () => {
    const [value, setValue] = React.useState('');
    const { setSearchValue} = React.useContext(SearchContext);

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 1000),
        [],
    );

    const onChangeInput = event => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <input value={value} onChange={(event) => setSearchValue(event.target.value)} className={styles.root} placeholder="Поиск пиццы ... " />
    );
};

export default Search;