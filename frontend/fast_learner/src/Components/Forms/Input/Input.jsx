import React from 'react';
import { Form } from 'react-bootstrap';
import './Input.css';

export const Input = (props) => {
  const { inputId, label, type, disabled, placeholder, text, 
          symbol, onChange, onBlur, name, className, value } = props;
  return (
    <Form.Group controlId={inputId} className="wrap-input">
        <Form.Label>{label}</Form.Label>
        <Form.Control 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={onChange} 
            onBlur={onBlur} 
            className="input-form-control" 
            className={className}
            value={value}
            disabled={disabled}
        />
        <Form.Text className="text-muted">{text}</Form.Text>
        <span className="symbol-input"> {symbol} </span>
    </Form.Group>
  )
}