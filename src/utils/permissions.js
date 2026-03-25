// Permission levels and role-based access control
export const ROLES = {
  ADMIN: 'admin',
  INVESTOR: 'investor',
  USER: 'user',
};

export const PERMISSIONS = {
  // Project management
  CREATE_PROJECT: 'create_project',
  EDIT_PROJECT: 'edit_project',
  DELETE_PROJECT: 'delete_project',
  VIEW_PROJECTS: 'view_projects',
  
  // User management
  MANAGE_USERS: 'manage_users',
  VIEW_INVESTORS: 'view_investors',
  
  // Content management
  MANAGE_CONTENT: 'manage_content',
  MANAGE_MEDIA: 'manage_media',
  
  // Settings
  MANAGE_SETTINGS: 'manage_settings',
};

// Role-based permission mapping
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_PROJECT,
    PERMISSIONS.EDIT_PROJECT,
    PERMISSIONS.DELETE_PROJECT,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_INVESTORS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.MANAGE_MEDIA,
    PERMISSIONS.MANAGE_SETTINGS,
  ],
  [ROLES.INVESTOR]: [
    PERMISSIONS.VIEW_PROJECTS,
  ],
  [ROLES.USER]: [
    PERMISSIONS.VIEW_PROJECTS,
  ],
};

// Check if user has permission
export const hasPermission = (userRole, permission) => {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

// Check if user has any of the permissions
export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some((perm) => hasPermission(userRole, perm));
};

// Check if user has all permissions
export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every((perm) => hasPermission(userRole, perm));
};
