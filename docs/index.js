/* eslint-disable global-require, import/no-unresolved, react/no-multi-comp, max-len, no-undef, semi, react/prop-types */
import React from 'react';
import { render } from 'react-dom';
import Reveal from '../src/index';
import './main.css';

const arr = Array(30).fill(1);
const WallOfText = () => (
  <div className="container">
    {arr.map((_, id) => (
      <Reveal>
        <p className="sr-item" key={id}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, labore quo? Dolor eius
          neque odit quis quo. Adipisci corporis dolorem fugit id, laboriosam minima odio porro
          quibusdam repudiandae sit, tempore, ut voluptas? Amet consequatur earum itaque natus quia
          totam ullam. Autem doloremque esse impedit laudantium nobis perferendis soluta totam vero?
        </p>
      </Reveal>
    ))}
  </div>
);

render(<WallOfText />, document.getElementById('app'));
