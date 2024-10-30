import React from 'react';
import qs from 'qs';

import { sortList } from '../components/Sort';
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizzaData);


    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? String(categoryId) : '';
        const search = searchValue;

            dispatch(
                fetchPizzas({
                sortBy,
                order,
                search,
                category,
                currentPage: String(currentPage),
              }),
            );

            window.scrollTo(0, 0);
    };

    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage
    //         });

    //         navigate(`?${queryString}`);
    //     }
    //     isMounted.current = true;
    // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1));

    //         const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

    //         dispatch(
    //             setFilters({
    //                 ...params,
    //                 sort,
    //             }),
    //         );
    //         isSearch.current = true;
    //     }
    // }, []);

    // React.useEffect(() => {
    //         window.scrollTo(0,0);

    //         if (!isSearch.current) {
    //             getPizzas();
    //         }

    //         isSearch.current = false;
    // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    React.useEffect(() => {
        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка</h2>
                    <p>
                        Не удалось получить пиццы. Попробуйте повторить позже.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}
            
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;