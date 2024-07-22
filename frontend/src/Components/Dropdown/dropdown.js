import React, { useState, useRef, useEffect } from 'react';
import * as style from './styles';
import FullBtn from '../Button/fullBtn';

export default function Dropdown(props) {
  const [view, setView] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  const category = [
    {
      id: 0,
      label: 'WINK',
      value: 'wink',
    },
    {
      id: 1,
      label: 'FOSCAR',
      value: 'foscar',
    },
  ];

  const handleView = () => {
    setView(!view);
  };

  useEffect(() => {
    const outSideClick = (e) => {
      const { target } = e;
      if (
        view &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setView(false);
      }
    };
    document.addEventListener('mousedown', outSideClick);

    return () => {
      document.removeEventListener('mousedown', outSideClick);
    };
  }, [view]);

  return (
    <style.DropdownContainer gap={props.gap}>
      {props.isModal ? (
        <FullBtn club={props.club} size={'small'} name={'사용 동아리'} />
      ) : (
        <style.DropdownTitleSpan>{props.content}</style.DropdownTitleSpan>
      )}
      <style.DropdownContentContainer
        width={props.width}
        height={props.height}
        ref={dropdownRef}
        view={view}
      >
        <style.DropdownHeader isModal={props.isModal}>
          <style.selectedValueItem>
            {selectedValue ? selectedValue.label : props.club.toUpperCase()}
          </style.selectedValueItem>
          {view ? (
            <img
              src={process.env.PUBLIC_URL + '/Images/Dropdown/upArrow.svg'}
              onClick={() => handleView()}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + '/Images/Dropdown/downArrow.svg'}
              onClick={() => handleView()}
            />
          )}
        </style.DropdownHeader>
        {view && (
          <style.DropdownContent>
            {category.map((item) => (
              <style.DropdownItem
                key={item.id}
                onClick={() => {
                  setSelectedValue(item);
                  handleView();
                }}
                selectedValue={selectedValue?.id === item.id}
              >
                {item.label}
              </style.DropdownItem>
            ))}
          </style.DropdownContent>
        )}
      </style.DropdownContentContainer>
    </style.DropdownContainer>
  );
}
