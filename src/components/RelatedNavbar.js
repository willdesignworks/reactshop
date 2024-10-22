import React from 'react';
import { Link } from 'react-router-dom';

const RelatedNavbar = ({ current }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb bg-white px-0 mb-0 py-3">
        <li className="breadcrumb-item">
          <Link className="text-muted" to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <Link className="text-muted" to="/products">全部商品</Link>
        </li>
        {/*<li className="breadcrumb-item active" aria-current="page">
        {current}
        </li>*/}
      </ol>
    </nav>
  );
};

export default RelatedNavbar;