import React from 'react'

export const ModifyData = (data) => {

    return data.split('\n').map((line, index) => {
      const [key, value] = line.split(':');
      return (
        <p key={index}>
          <strong>{key}:</strong> {value}
        </p>
      );
    });
  };