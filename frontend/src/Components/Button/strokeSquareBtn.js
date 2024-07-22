/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  SmallStrokeSquareButton,
  BigStrokeSquareButton,
  MiddleStrokeSquareButton,
  ImageForSquare,
} from './styles';
import { themeWink, themeFoscar } from '../Theme/theme';

export default function StrokeSquareBtn(props) {
  return (
    <ThemeProvider theme={props.club === 'foscar' ? themeFoscar : themeWink}>
      {props.size === 'small' ? (
        <SmallStrokeSquareButton onClick={props.onClick}>
          <ImageForSquare src={props.url} />
        </SmallStrokeSquareButton>
      ) : props.size === 'middle' ? (
        <MiddleStrokeSquareButton onClick={props.onClick}>
          <ImageForSquare src={props.url} />
        </MiddleStrokeSquareButton>
      ) : (
        <BigStrokeSquareButton onClick={props.onClick}>
          <ImageForSquare src={props.url} />
        </BigStrokeSquareButton>
      )}
    </ThemeProvider>
  );
}
