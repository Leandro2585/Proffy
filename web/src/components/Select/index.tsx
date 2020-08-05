import React, { SelectHTMLAttributes } from 'react';
import './style.css';
interface Props extends SelectHTMLAttributes<HTMLSelectElement>{
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}
const Select: React.FC<Props> = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
        <label htmlFor={name}>{label}</label>
        <select value="" id={name} {...rest} >
          <option value="" disabled hidden>Selecione uma opção</option>
          {options.map(opt => {
            return <option key={opt.value} value={opt.value}>{opt.label}</option>
          })}
        </select>
    </div>
  );
}
export default Select;
