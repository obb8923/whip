/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  SmallFullSquareButton,
  BigFullSquareButton,
  ImageForSquare,
} from './styles';
import { themeWink, themeFoscar } from '../Theme/theme';

export default function FullSquareBtn(props) {
  return (
    <ThemeProvider theme={props.club === 'foscar' ? themeFoscar : themeWink}>
      {props.size === 'small' ? (
        <SmallFullSquareButton onClick={props.onClick}>
          <ImageForSquare src={props.url} />
        </SmallFullSquareButton>
      ) : (
        <BigFullSquareButton onClick={props.onClick}>
          <ImageForSquare src={props.url} />
        </BigFullSquareButton>
      )}
    </ThemeProvider>
  );
}
