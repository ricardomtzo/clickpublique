import React, { useEffect, useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

export default function ButtonSelect(props: ButtonProps & { selected?: boolean }) {
    const [isSelected, setIsSelected] = useState(props?.selected);

    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    useEffect(() => {
        setIsSelected(props?.selected);
    }, [props?.selected]);

    return (
        <Button
            variant={isSelected ? 'contained' : 'outlined'}
            color={isSelected ? 'primary' : 'info'}
            onClick={handleClick}
            startIcon={isSelected && <CheckIcon />}
            {...props}
        />
    );
}