import React from 'react';
import Select from 'react-select';

const DropdownMenu = ({ value, onOptionChange }) => {
    const options = [
        { value: 'text', label: 'Texto' },
        { value: 'radio', label: 'Múltipla Escolha' },
        { value: 'checkbox', label: 'Caixa de Seleção' },
    ];

    const handleChange = (selectedOption) => {
        onOptionChange(selectedOption.value);
    };

    return (
        <div className="overlay">
            <Select
                value={options.find((option) => option.value === value)}
                onChange={handleChange}
                options={options}
                className="block w-200"
            />
        </div>
    );
};

export default DropdownMenu;
