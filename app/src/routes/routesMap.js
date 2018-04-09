import React from 'react';
import { redirect } from 'redux-first-router';
import { userInfoSelector, activeProjectSelector, setActiveProjectAction } from 'controllers/user';
import { fetchProjectAction } from 'controllers/project';
import { LOGIN_PAGE, REGISTRATION_PAGE, PROJECT_DASHBOARD_PAGE } from 'controllers/pages';
import { isAuthorizedSelector } from 'controllers/auth';

const projectRouteThunk = (dispatch, getState) => {
	const { type, payload } = getState().location;

	const hashProject = payload.projectId;
	const userProjects = userInfoSelector(getState()).assigned_projects;
	if (userProjects
		&& Object.prototype.hasOwnProperty.call(userProjects, hashProject)
		&& hashProject !== activeProjectSelector(getState())) {

		dispatch(setActiveProjectAction(hashProject));
		dispatch(fetchProjectAction(hashProject));
	}

	dispatch({ type, payload });
};

const projectRoute = path => {
	return {
		path,
		thunk: projectRouteThunk
	};
};

const redirectRoute = (path, createNewAction) => {
	return {
		path,
		thunk: (dispatch, getState) => {
			const location = getState().location;
			const action = createNewAction(location.payload);
			console.log('redirecting to ' + action.type);
			dispatch(redirect(action));
		}
	};
};

const requiresAnonymous = ({type}) => {
	switch (type) {
		case LOGIN_PAGE:
		case REGISTRATION_PAGE:
			return true;
	}

	return false;
}

const requiresAuthorized = action => !requiresAnonymous(action);

export const onBeforeRouteChange = (dispatch, getState, { action }) => {
	const authorized = isAuthorizedSelector(getState());
	if (authorized) {
		if (requiresAnonymous(action)) {
			const projectId = activeProjectSelector(getState());
			dispatch(redirect({type:PROJECT_PAGE, payload: {projectId}}));
		}
	} else {
		if (requiresAuthorized(action)) {
			if (action.type !== LOGIN_PAGE) {
				dispatch(redirect({type:LOGIN_PAGE}));
			}
		}
	}
}

export default {
	HOME_PAGE: redirectRoute('/', payload => ({type:LOGIN_PAGE, payload})),

	LOGIN_PAGE: '/login',
	REGISTRATION_PAGE: '/registration',

	ADMINISTRATE_PAGE: '/administrate',
	USER_PROFILE_PAGE: '/user-profile',

	API_PAGE: '/api',

	PROJECT_PAGE: redirectRoute('/:projectId', payload => ({ type: PROJECT_DASHBOARD_PAGE, payload: { projectId: 'default_project'} })),
	PROJECT_DASHBOARD_PAGE: '/:projectId/dashboard',
	PROJECT_LAUNCHES_PAGE: '/:projectId/launches',
	PROJECT_FILTERS_PAGE: '/:projectId/filters',
	PROJECT_USERDEBUG_PAGE: '/:projectId/userdebug',
	PROJECT_MEMBERS_PAGE: '/:projectId/members',
	PROJECT_SETTINGS_PAGE: '/:projectId/settings',
	PROJECT_SANDBOX_PAGE: '/:projectId/sandbox'
};
