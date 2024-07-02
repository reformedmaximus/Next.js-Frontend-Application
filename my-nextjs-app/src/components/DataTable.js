import axios from 'axios';
import { useEffect, useState } from 'react';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response=> setData(response.data))
        .catch(error => console.error('error fetching data:', error));
    }, []);




};

export default DataTable;