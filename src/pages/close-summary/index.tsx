import React, { useEffect, useState, useCallback } from 'react';
import { Typography, TableHead, TableRow, TableCell, Table, TableBody, Theme, Paper, TablePagination, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RouterProps, RouteProps, RouteChildrenProps, Route, RouteComponentProps } from 'react-router';

export interface CloseParams {id: string}

const CloseSummaryPage: React.FC<RouteComponentProps<CloseParams>> = ({ match, ...props }) => {
    const { id } = match.params;
    const { state } = props.location;
    const [affectedEntities, setAffectedEntities] = useState();

    useEffect(() => {
        const fetch = async () => {
            const fetchedEntities = await onFetchModulesEntities(service, id, dispatch);
            setAffectedEntities(fetchedEntities);
        };
    });
    const [state, dispatch] = useReducer(bigPayloadReducer, stateFromDirector);
    const entitiesManager = new Director();

    return (
        <div>
            HI, I found you {id && id}, {state && state}
        </div>
    );
};

export default CloseSummaryPage;
