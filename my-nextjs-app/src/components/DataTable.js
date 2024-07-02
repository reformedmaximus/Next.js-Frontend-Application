'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // number of posts per page

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => setData(response.data))
            .catch(error => console.error('error fetching data:', error));
    }, []);

    //slice the data for current page 
    const indexofLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexofLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexofLastPost);

    //change page 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // total number of pages 
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }


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
                    {currentPosts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    ))}


                </tbody>



            </table>
         <div>
            {pageNumbers.map(number => (
                <button key = {number} onClick={() => paginate(number)}>
                 {number}
                </button>
            ))}
         </div>

        </div>


    );


};

export default DataTable;