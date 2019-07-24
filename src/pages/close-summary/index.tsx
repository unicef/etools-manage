import React, { useEffect, useState, useCallback } from 'react';
import { Typography, TableHead, TableRow, TableCell, Table, TableBody, Theme, Paper, TablePagination, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RouterProps, RouteProps, RouteChildrenProps, Route, RouteComponentProps } from 'react-router';
import { useAppState, useAppService, useAppDispatch } from 'contexts/app';
import { onFetchModulesEntities } from './actions';
import { ModuleEntitiesManager, DisplayDirector, Builders } from 'entities';
import Box from 'components/box';
import { keys, isEmpty } from 'ramda';
import { ZippedEntityResults } from 'entities/types';
import { notEmpty } from 'utils/helpers';

export interface CloseParams {id: string}

const CloseSummaryPage: React.FC<RouteComponentProps<CloseParams>> = ({ match, ...props }) => {
    const { id } = match.params;
    const { state } = props.location;

    const { currentEntitiesData } = useAppState();
    const dispatch = useAppDispatch();
    const {
        backendService,
        sectionsService,
        storageService
    } = useAppService();


    const director: DisplayDirector = new ModuleEntitiesManager();
    let builders = director.entityBuilders;

    useEffect(() => {
        onFetchModulesEntities({ backendService, storageService }, id, dispatch);
    }, []);

    useEffect(() => {
        if (currentEntitiesData) {
            director.initialize(currentEntitiesData);
            builders = director.entityBuilders;
            console.log('TCL: builders', builders);
        }
    }, [currentEntitiesData]);
    // const [state, dispatch] = useReducer(bigPayloadReducer, stateFromDirector);
    // const entitiesManager = new Director();
    const dataLoaded = notEmpty(builders);
    console.log('TCL: dataLoaded', dataLoaded);
    return (
        <div>
            HI, I found you {id && id},
            <Box column>
                { currentEntitiesData && dataLoaded ? keys(currentEntitiesData).map(
                    (entityName: keyof ZippedEntityResults) => {
                        const { Component } = builders[entityName];
                        console.log('TCL: Component', Component);

                        return (
                            <Component
                                key={entityName}
                                onChange={() => console.log('onChange', entityName)}
                                list={currentEntitiesData[entityName]} />
                        );
                    }
                ) : null}
            </Box>
        </div>
    );
};

export default CloseSummaryPage;
