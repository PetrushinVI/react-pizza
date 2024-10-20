import React from 'react';
import qs from 'qs';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { sortList } from '../components/Sort';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizzaData);


    const onChangeCategory = (idx: number) => {
        dispatch(setCategoryId(idx));
    };

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    const getPizzas = async () => {

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const search = searchValue ? `&search=${searchValue}` : '';
        const category = categoryId > 0 ? `category=${categoryId}` : '';


            dispatch(
                // @ts-ignore
                fetchPizzas({
                sortBy,
                order,
                search,
                category,
                currentPage,
              }),
            );
    };

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
            window.scrollTo(0,0);

            if (!isSearch.current) {
                getPizzas();
            }

            isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);



    const pizzas = items.map((obj: any) => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock  {...obj} /></Link>);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
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