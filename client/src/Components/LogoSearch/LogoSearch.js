import React from 'react'
import './LogoSearch.css'
import Logo from '../../Img/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { purple } from '@mui/material/colors';

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>

      <div className="Logo" style={{color:"purple",fontSize:"2rem",marginRight:"2%"}}>Zylo</div>

      <div className="Search">
        <input type="text" placeholder='#Search' />

        <div className="s-icon">
          <SearchIcon />
        </div>
      </div>

    </div>
  )
}

export default LogoSearch
