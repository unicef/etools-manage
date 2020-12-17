import { FullStoreShape } from 'contexts/app';
import { ACTION_BAR_DISABLED_ACTIONS } from 'pages/close-section/constants';

export const intialRootState: FullStoreShape = {
    closeSectionPayload: {
        interventions: {},
        travels: {},
        actionPoints: {},
        tpmActivities: {},
        fmActivities: {},
        fmQuestions: {}
    },
    sections: [],
    closedSectionSuccess: false,
    sectionsFromSplit: [],
    moduleEditingName: '',
    mergedSection: null,
    inProgressItems: [],
    currentActiveSectionId: -1,
    createdSection: null,
    ui: {
        selectedMenuIdx: 0,
        closeSectionActionBar: ACTION_BAR_DISABLED_ACTIONS,
        viewCloseSummary: false
    },
    error: '',
    loading: false,
    user: null
};
