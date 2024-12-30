import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllStocksSearchThunk } from '../../redux/stocks';

//  We can have a search bar where users can input information
//  and get one or more search results. 
//  So, what's next? How should the search results be displayed? 
//  Should there be a search results page? 
//  Then, when users click on a specific stock in the search results page, 
//  should they be redirected to the stock's detail page?
