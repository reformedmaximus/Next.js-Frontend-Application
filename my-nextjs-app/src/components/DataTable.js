'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => setData(response.data))
            .catch(error => console.error('error fetching data:', error));
    }, []);

    return (
        <div>
            <h1> Posts </h1>
            <table border="1" style={{ width: '100%', textAlign: 'left' }} >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(post => ( 
                        <tr key = {post.id}>
                           <td>{post.id}</td> 
                           <td>{post.title}</td> 
                           <td>{post.body}</td> 
                        </tr>
                    ))}


                </tbody>



            </table>




        </div>


    );


};

export default DataTable;