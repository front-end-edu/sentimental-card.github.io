import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ImageListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const getImages = async (url) => await axios.get(url);

const ImageList = () => {
  const [searchValue, setSearchValue] = useState('풍경');
  const [images, setImages] = useState([]);
  const animals = ['풍경', '사랑', '이별', '시간', '희망', '노력'];
  const animalsList = animals.map((name, index) => <li onClick={() => HandleClick(name, index)}>{name}</li>);
  const pixbayKey = '24070790-2b3f6a587f470abbf40d40b1f'; // API KEY
  const search = animals[0]; // 검색어
  const limit = 10;

  const HandleClick = (item, idx) => {
    console.log(item);
    getImages(`https://pixabay.com/api/?key=${pixbayKey}&q=${item}&image_type=photo&per_page=${limit}`).then((res) => {
      setImages(res.data.hits);
    });
  };

  useEffect(() => {
    getImages(`https://pixabay.com/api/?key=${pixbayKey}&q=${searchValue}&image_type=photo&per_page=${limit}`).then((res) => {
      setImages(res.data.hits);
    });
  }, []);

  return (
    <div>
      <div>
        <ul>{animalsList}</ul>
      </div>
      {images.map((item) => (
        <div>
          <img src={item.webformatURL} alt={item.webformatURL} />
        </div>
      ))}
    </div>
  );
};

export default ImageList;