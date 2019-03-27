import { connectRoutes } from 'redux-first-router';
import queryString from 'query-string';
import {
    PAGE_ONE,
    PAGE_TWO,
    PAGE_THREE
} from '../constants';
import { refreshAuthState, onRouteTransition } from '../actions';

const logoIdMatcher = ':logoId(\\d+)';

const ROUTE_MAPPING = {
    [ADMIN_GALLERY]: '/admin-gallery',
    [GALLERY_LOGO_PAGE]: `/gallery/${logoIdMatcher}`,
    [GALLERY_PAGE]: '/gallery',
    [DASHBOARD_PAGE]: '/dashboard',
    [NOMINATION_PAGE]: `/nomination/${logoIdMatcher}`,
    [ACCOUNT_SETTINGS_PAGE]: '/account-settings',
    [REFERRAL_PAGE]: '/referral',
    [GENERATOR_PAGE]: '/(logo-maker|make-a-logo)',
    [EXPLORE_PAGE]: '/explore',
    [BRAND_GUIDELINES]: '/(b|brandguidelines)/:companySlug',
    [CHECKOUT_PAGE]: `/checkout/${logoIdMatcher}`,
    [CHECKOUT_WEEBLY_PAGE]: `/checkout/${logoIdMatcher}/website-editor`,
    [CONTESTS_PAGE]: '/contests/:contestslug',
    [CONTESTS_ENTRY_PAGE]: `/contests/:contestslug/${logoIdMatcher}`,
    [AUTH_PAGE]: '/auth',
    [EDITOR_PAGE]: `/editor/${logoIdMatcher}`,
    [SHARE_PAGE]: `/(s|share)/${logoIdMatcher}`,
    [BUSINESS_CARDS_PAGE]: '/business-cards/:id',
    [ADMIN_TOOLS_PAGE]: '/admin-tools',
    [ASSETS_PAGE]: `/assets/logo/${logoIdMatcher}`,
    [INVOICE_PAGE]: '/orders/invoice/:invoiceid',
    [BRAND_DASHBOARD_PAGE]: `/brands/${logoIdMatcher}`,
    [WEEBLY_LOGIN_REDIRECT_PAGE]: `/brands/${logoIdMatcher}/weebly-login`
};

const shouldPerformAction = action => {
    if (!action) {
        return false;
    }

    const {
        meta: {
            location: {
                current: { type: currentType },
                prev: { type: prevType }
            }
        }
    } = action;
    return currentType !== prevType && prevType;
};

const onAfterChange = (dispatch, getState, { action }) => {
    if (shouldPerformAction(action)) {
        dispatch(refreshAuthState());
    }
};

const onBeforeChange = (dispatch, getState, { action }) => {
    // Make sure the two routes are different.
    if (shouldPerformAction(action)) {
        dispatch(onRouteTransition());
    }
};

export default () => {
    return {
        ...connectRoutes(ROUTE_MAPPING, {
            querySerializer: queryString,
            onAfterChange,
            onBeforeChange,
            restoreScroll: restoreScroll()
        })
    };
};
