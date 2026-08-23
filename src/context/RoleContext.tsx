import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRoleId, USER_ROLES, UserRoleData } from '../data/rolesData';

interface RoleContextType {
  currentRole: UserRoleId;
  roleData: UserRoleData;
  setRole: (roleId: UserRoleId) => void;
  isRoleModalOpen: boolean;
  setIsRoleModalOpen: (open: boolean) => void;
  hasExplicitlySelectedRole: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = 'muco_user_role';

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRoleId>('business-owner');
  const [hasExplicitlySelectedRole, setHasExplicitlySelectedRole] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY) as UserRoleId | null;
      if (saved && USER_ROLES.some((r) => r.id === saved)) {
        setCurrentRoleState(saved);
        setHasExplicitlySelectedRole(true);
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const setRole = (roleId: UserRoleId) => {
    setCurrentRoleState(roleId);
    setHasExplicitlySelectedRole(true);
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, roleId);
    } catch {
      // Ignore storage write errors
    }
  };

  const roleData = USER_ROLES.find((r) => r.id === currentRole) || USER_ROLES[0];

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        roleData,
        setRole,
        isRoleModalOpen,
        setIsRoleModalOpen,
        hasExplicitlySelectedRole
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useUserRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a RoleProvider');
  }
  return context;
};
