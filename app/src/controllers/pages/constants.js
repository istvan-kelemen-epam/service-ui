import { NOT_FOUND } from 'redux-first-router';

// undefined page
export const NO_PAGE = undefined;
// admin
export const ADMINISTRATE_PAGE = 'ADMINISTRATE_PAGE';
export const PROJECTS_PAGE = 'PROJECTS_PAGE';
// inside
export const API_PAGE = 'API_PAGE';
export const PROJECT_PAGE =  'PROJECT_PAGE';
export const PROJECT_DASHBOARD_PAGE = 'PROJECT_DASHBOARD_PAGE';
export const PROJECT_FILTERS_PAGE = 'PROJECT_FILTERS_PAGE';
export const PROJECT_LAUNCHES_PAGE = 'PROJECT_LAUNCHES_PAGE';
export const PROJECT_MEMBERS_PAGE = 'PROJECT_MEMBERS_PAGE';
export const PROJECT_SANDBOX_PAGE = 'PROJECT_SANDBOX_PAGE';
export const PROJECT_SETTINGS_PAGE = 'PROJECT_SETTINGS_PAGE';
export const PROJECT_USERDEBUG_PAGE = 'PROJECT_USERDEBUG_PAGE';
export const USER_PROFILE_PAGE = 'USER_PROFILE_PAGE';
// outside
export const LOGIN_PAGE = 'LOGIN_PAGE';
export const REGISTRATION_PAGE = 'REGISTRATION_PAGE';

export const pageNames = {
	[NOT_FOUND]: NOT_FOUND,
	ADMINISTRATE_PAGE,
	PROJECTS_PAGE,
	API_PAGE,
	PROJECT_DASHBOARD_PAGE,
	PROJECT_FILTERS_PAGE,
	PROJECT_LAUNCHES_PAGE,
	PROJECT_MEMBERS_PAGE,
	PROJECT_SANDBOX_PAGE,
	PROJECT_SETTINGS_PAGE,
	PROJECT_USERDEBUG_PAGE,
	USER_PROFILE_PAGE,
	LOGIN_PAGE,
	REGISTRATION_PAGE
};
