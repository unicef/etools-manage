import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCloseSectionBackendPayload } from 'selectors/close-section-payload';
import { ConfirmButton } from './buttons';
import { onSubmitCloseSection } from 'pages/close-section/actions';
import { useAppService } from 'contexts/app';

const ConnectedConfirmButton: React.FC = () => {
    const backendPayload = useSelector(getCloseSectionBackendPayload);
    const { sectionsService } = useAppService();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(onSubmitCloseSection(sectionsService, backendPayload));
    };

    return <ConfirmButton onClick={handleSubmit}>Submit</ConfirmButton>;
};

export default ConnectedConfirmButton;
