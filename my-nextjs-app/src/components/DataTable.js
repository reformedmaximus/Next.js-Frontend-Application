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

    //adjust margin bottom (mb) for spacing between elements
    return (
        <div className='container mx-auto p-8 bg-gradient-to-r from-purple-800 via-pink-600 to-red-500 text-white'>
            <h1 className='text-4xl font-bold mb-4 text-left'> Posts </h1>
            <div className='flex justify-start mb-4 w-full' > 
            <input type='text' placeholder='Search posts...' value={search} onChange={handleSearchChange} className='w-80 p-3 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"'></input>
            </div>
            <table className='min-w-full bg-white text-black rounded-lg overflow-hidden shadow-lg' >
                <thead>
                    <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                        <th className ='py-3 px-6 text-left cursor-pointer' onClick={() => handleSort('id')}>ID</th>
                        <th className ='py-3 px-6 text-left cursor-pointer' onClick={() => handleSort('title')}>Title</th>
                        <th className ='py-3 px-6 text-left cursor-pointer' onClick={() => handleSort('body')}>Body</th>
                    </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                    {currentPosts.map(post => (
                        <tr key={post.id} className='border-b border-gray-200 hover:bg-gray-100'>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-8'>
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className="mx-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200">
                        {number}
                    </button>
                ))}
            </div>
            <div className='flex justify-center mt-8'>
            <Graph data={filteredData}></Graph>
            </div>

        </div>


    );


};

export default DataTable;