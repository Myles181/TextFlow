import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  isPhoneVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  hasSeenTutorial: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  completeTutorial: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneForVerification?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isOnboardingComplete: false,
    hasSeenTutorial: false
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage for existing session
        const token = localStorage.getItem('textflow_token');
        const userData = localStorage.getItem('textflow_user');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          setState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
            isLoading: false
          }));
        } else {
          setState(prev => ({
            ...prev,
            isLoading: false
          }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const user: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1 (555) 123-4567',
        isPhoneVerified: true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      // Store in localStorage
      localStorage.setItem('textflow_token', 'mock_token_123');
      localStorage.setItem('textflow_user', JSON.stringify(user));

      setState(prev => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user data
      const user: User = {
        id: '1',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneForVerification,
        isPhoneVerified: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      // Store in localStorage
      localStorage.setItem('textflow_token', 'mock_token_123');
      localStorage.setItem('textflow_user', JSON.stringify(user));

      setState(prev => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('textflow_token');
    localStorage.removeItem('textflow_user');

    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      isOnboardingComplete: false,
      hasSeenTutorial: false
    });
  };

  const completeOnboarding = () => {
    setState(prev => ({
      ...prev,
      isOnboardingComplete: true
    }));

    // Store in localStorage
    localStorage.setItem('textflow_onboarding_complete', 'true');
  };

  const completeTutorial = () => {
    setState(prev => ({
      ...prev,
      hasSeenTutorial: true
    }));

    // Store in localStorage
    localStorage.setItem('textflow_tutorial_complete', 'true');
  };

  const updateUser = (updates: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...updates };
      setState(prev => ({
        ...prev,
        user: updatedUser
      }));

      // Update localStorage
      localStorage.setItem('textflow_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    completeOnboarding,
    completeTutorial,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 