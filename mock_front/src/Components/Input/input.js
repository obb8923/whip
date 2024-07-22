import React from 'react';
import * as style from './styles';

export default function Input(props) {
  return (
    <>
      {props.isModal ? (
        <style.Container>
          {props.isArea ? (
            <style.Textarea
              width={props.width}
              height={props.height}
              name={props.name}
              type={props.type || 'text'}
              placeholder={props.contentPlaceholder}
              onChange={props.onChange}
              onClick={props.onClick}
              value={props.value}
            />
          ) : (
            <style.Input
              width={props.width}
              height={props.height}
              onClick={props.onClick}
              placeholder={props.placeholder}
              onChange={props.onChange}
              value={props.value}
              onKeyDown={
                props.onKeyDown ? (e) => props.onKeyDown(e) : undefined
              }
            />
          )}
        </style.Container>
      ) : (
        <style.Container>
          <span>{props.content}</span>
          <style.Input
            gap={props.gap}
            width={props.width}
            height={props.height}
            onClick={props.onClick}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            onKeyDown={props.onKeyDown ? (e) => props.onKeyDown(e) : undefined}
          />
        </style.Container>
      )}
    </>
  );
}
