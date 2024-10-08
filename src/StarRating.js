import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0); // 初始評分為0
  const [hover, setHover] = useState(0);   // 用來管理滑鼠懸停的狀態

  return (
    <>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)} // 當點擊星星時，更新評分
            onMouseEnter={() => setHover(index)} // 當滑鼠懸停在星星上時
            onMouseLeave={() => setHover(rating)} // 當滑鼠移開星星時
          >
            <span className="star">&#9733;</span> {/* 使用 HTML 的星星符號 */}
          </button>
        );
      })}
    </>
  );
};

export default StarRating;
