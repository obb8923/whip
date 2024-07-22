import React from 'react';
import * as style from './styles';
import { ThemeProvider } from 'styled-components';
import { themeWink, themeFoscar } from '../Theme/theme';

export default function TitleBox(props) {
  return (
    <ThemeProvider theme={props.club === 'wink' ? themeWink : themeFoscar}>
      <style.TitleBox pageName={props.pageName}>
        <span>{props.title}</span>
      </style.TitleBox>
    </ThemeProvider>
  );
}
