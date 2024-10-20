import React from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const FullPizza = () => {
    const [pizza, setPizza] = React.useState();
    const {id} = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://66dcb6ac47d749b72acc4e61.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы!');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return 'Загрузка ...';
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
};

export default FullPizza;