import React from 'react';
import * as style from './styles';

export default function Box(props) {
  return (
    <style.Box
      width={props.width}
      height={props.height}
      borderColor={props.borderColor}
      onClick={props.onClick}
    >
      {props.pageName === 'profile' ? (
        <>
          <style.BoxTitle>
            <span>{props.content}</span>
          </style.BoxTitle>
        </>
      ) : props.pageName === 'main' ? (
        <style.BoxContent>
          <img src={props.src} alt="chair-icon" />
          <span>{props.content}</span>
        </style.BoxContent>
      ) : (
        props.pageName === 'regularSeat' && (
          <div>
            <style.BoxTitle>
              <span>{props.title1}</span>
            </style.BoxTitle>
            <style.BoxContent>
              <span>{props.content1}</span>
            </style.BoxContent>
            <br />
            <style.BoxTitle>
              <span>{props.title2}</span>
            </style.BoxTitle>
            <style.BoxContent>
              <span>{props.content2}</span>
            </style.BoxContent>
          </div>
        )
      )}
    </style.Box>
  );
}
