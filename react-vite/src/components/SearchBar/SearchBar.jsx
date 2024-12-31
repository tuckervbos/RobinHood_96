import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { showAllStocksSearchThunk } from '../../redux/stock';


const SearchBar = ()=>{
    const [query,setQuery] = useState('')
    const dispatch = useDispatch()

    const handleSearch = (e) =>{
        e.preventDefault()
        if(query.trim()){
            dispatch(showAllStocksSearchThunk(query))
            setQuery('')
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type='text'
                    placeholder='search stocks here'
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                />
                <button type='submit'>search</button>

                {/* when we get the result ,we need redirect to search result page */}
            </form>
        </div>
    )
}
export default SearchBar