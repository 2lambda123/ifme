// @flow
import React from 'react';
import type { Node } from 'react';
import renderHTML from 'react-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import globalCss from 'styles/_global.scss';
import { Tooltip } from 'components/Tooltip';
import css from './Input.scss';
import type { Checkbox as Props } from './utils';

const displayUnchecked = (name: ?string, uncheckedValue: ?any) => (
  <input name={name} type="hidden" value={uncheckedValue} />
);

const handleOnChange = (
  e: SyntheticEvent<HTMLInputElement>,
  onChange?: Function,
  id: string,
) => {
  const { checked } = e.currentTarget;
  if (onChange) {
    onChange({ checked, id });
  }
};

const displayInfo = (info: ?string) => {
  if (!info) return null;
  return (
    <Tooltip
      element={<FontAwesomeIcon icon={faQuestion} />}
      text={info}
      right
    />
  );
};

const displayCheckbox = (id, name, value, checked, onChange, label) => (
  <input
    id={id}
    name={name}
    type="checkbox"
    value={value}
    defaultChecked={checked}
    onChange={(e: SyntheticEvent<HTMLInputElement>) => handleOnChange(e, onChange, id)}
    aria-label={label.replace(/<\/?[^>]+(>|$)/g, '')}
  />
);

export const InputCheckbox = (props: Props): Node => {
  const {
    id,
    name,
    value,
    label,
    uncheckedValue,
    checked,
    info,
    onChange,
  } = props;
  return (
    <div className={`${css.checkbox} ${globalCss.gridRowSpaceBetween}`}>
      <div>
        {typeof uncheckedValue !== 'undefined'
          && displayUnchecked(name, uncheckedValue)}
        {displayCheckbox(id, name, value, checked, onChange, label)}
        <label className={`${css.checkboxLabel}`} htmlFor={id}>
          {renderHTML(label)}
        </label>
      </div>
      {displayInfo(info)}
    </div>
  );
};
