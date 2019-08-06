import React from 'react';
import { useSelector } from 'react-redux';
import { getCloseSectionBackendPayload } from 'selectors/close-section-payload';
import { ConfirmButton } from './buttons';

const ConnectedConfirmButton: React.FC = () => {

    const backendPayload = useSelector(getCloseSectionBackendPayload);

    const handleSubmit = () => {
        console.log('BACK PAYLOAD', backendPayload);
    };
    return (
        <ConfirmButton onClick={handleSubmit}>Confirm</ConfirmButton>
    );
};

export default ConnectedConfirmButton;
