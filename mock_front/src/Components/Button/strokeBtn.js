import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StrokeButton } from './styles';
import { themeWink, themeFoscar } from '../Theme/theme';

export default function StrokeBtn(props) {
  return (
    <ThemeProvider theme={props.club === 'foscar' ? themeFoscar : themeWink}>
      <StrokeButton onClick={props.onClick}>{props.name}</StrokeButton>
    </ThemeProvider>
  );
}
