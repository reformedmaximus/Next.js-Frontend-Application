'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Graph from './Graph';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // number of posts per page
    const [sortConfig, setSortConfig] = useState({key : '', direction:''});


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => console.error('error fetching data:', error));
    }, []);

    // handling search input change 
    const handleSearchChange = (Event) => {
        const searchTerm = Event.target.value;
        setSearch(searchTerm);
        const filtered = data.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.body.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredData(filtered);
        setCurrentPage(1); // reset to first page on new search 
    }
    
    //sorting table headers
    const handleSort = (key) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });

      const sortedData = [...filteredData].sort((a,b) => {
        if (a[key] < b[key]) {
            return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return direction === 'ascending' ? 1 : -1;
        }
        return 0;

      });
      setFilteredData(sortedData);

    }


    //slice the data for current page 
    const indexofLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexofLastPost - postsPerPage;
    const currentPosts = filteredData.slice(indexOfFirstPost, indexofLastPost);

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
            <input type='text' placeholder='Search posts...' value={search} onChange={handleSearchChange} style={{ marginBottom: '10px' }}></input>
            <table border="1" style={{ width: '100%', textAlign: 'left' }} >
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>ID</th>
                        <th onClick={() => handleSort('title')}>Title</th>
                        <th onClick={() => handleSort('body')}>Body</th>
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
                    <button key={number} onClick={() => paginate(number)}>
                        {number}
                    </button>
                ))}
            </div>
            <Graph data={filteredData}></Graph>

        </div>


    );


};

export default DataTable;