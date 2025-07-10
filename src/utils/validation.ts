export interface ValidationRule {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  message: string;
  strengthIndicator?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  strength?: PasswordStrength;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  requirements: string[];
}

export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
    message: "Please enter a valid email address"
  },
  password: {
    minLength: 8,
    required: true,
    message: "Password must be at least 8 characters",
    strengthIndicator: true
  },
  confirmPassword: {
    required: true,
    message: "Please confirm your password"
  },
  firstName: {
    required: true,
    message: "First name is required"
  },
  lastName: {
    required: true,
    message: "Last name is required"
  },
  phoneNumber: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
    message: "Please enter a valid phone number"
  }
};

export const validateField = (
  value: string,
  fieldName: keyof typeof validationRules,
  confirmValue?: string
): ValidationResult => {
  const rule = validationRules[fieldName];
  
  // Check if required
  if (rule.required && !value.trim()) {
    return {
      isValid: false,
      message: rule.message
    };
  }

  // Check minimum length
  if (rule.minLength && value.length < rule.minLength) {
    return {
      isValid: false,
      message: rule.message
    };
  }

  // Check maximum length
  if (rule.maxLength && value.length > rule.maxLength) {
    return {
      isValid: false,
      message: `Maximum ${rule.maxLength} characters allowed`
    };
  }

  // Check pattern
  if (rule.pattern && !rule.pattern.test(value)) {
    return {
      isValid: false,
      message: rule.message
    };
  }

  // Special validation for password confirmation
  if (fieldName === 'confirmPassword' && confirmValue !== undefined) {
    if (value !== confirmValue) {
      return {
        isValid: false,
        message: "Passwords do not match"
      };
    }
  }

  // Password strength validation
  if (fieldName === 'password' && rule.strengthIndicator) {
    const strength = getPasswordStrength(value);
    return {
      isValid: strength.score >= 3, // Require at least "Good" strength
      message: strength.score >= 3 ? "Password is strong" : "Please choose a stronger password",
      strength
    };
  }

  return {
    isValid: true,
    message: "Looks good!"
  };
};

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return {
      score: 0,
      label: '',
      color: '',
      requirements: []
    };
  }

  let score = 0;
  const requirements: string[] = [];

  // Length check
  if (password.length >= 8) {
    score++;
  } else {
    requirements.push('At least 8 characters');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    requirements.push('One uppercase letter');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score++;
  } else {
    requirements.push('One lowercase letter');
  }

  // Number check
  if (/[0-9]/.test(password)) {
    score++;
  } else {
    requirements.push('One number');
  }

  // Special character check
  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  } else {
    requirements.push('One special character');
  }

  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = [
    'text-error-500',
    'text-warning-500',
    'text-warning-500',
    'text-success-500',
    'text-success-500'
  ];

  return {
    score,
    label: labels[score - 1] || '',
    color: colors[score - 1] || '',
    requirements
  };
};

export const validateForm = (formData: Record<string, string>): Record<string, ValidationResult> => {
  const results: Record<string, ValidationResult> = {};

  Object.keys(formData).forEach(fieldName => {
    if (fieldName in validationRules) {
      const confirmValue = fieldName === 'confirmPassword' ? formData.password : undefined;
      results[fieldName] = validateField(
        formData[fieldName],
        fieldName as keyof typeof validationRules,
        confirmValue
      );
    }
  });

  return results;
};

export const isFormValid = (validationResults: Record<string, ValidationResult>): boolean => {
  return Object.values(validationResults).every(result => result.isValid);
};

// Real-time validation helpers
export const getFieldStatus = (value: string, isValid: boolean, isTouched: boolean) => {
  if (!isTouched) return 'default';
  if (isValid) return 'success';
  return 'error';
};

export const getFieldIcon = (value: string, isValid: boolean, isTouched: boolean) => {
  if (!isTouched || !value) return null;
  if (isValid) return 'check';
  return 'alert';
};

// Phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 3) return `(${cleaned}`;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  if (cleaned.length <= 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

// Email validation with better UX
export const validateEmail = (email: string): ValidationResult => {
  const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  
  if (!email) {
    return {
      isValid: false,
      message: "Email is required"
    };
  }

  if (!basicPattern.test(email)) {
    return {
      isValid: false,
      message: "Please enter a valid email address"
    };
  }

  const domain = email.split('@')[1];
  if (domain && !commonDomains.includes(domain.toLowerCase())) {
    return {
      isValid: true,
      message: "Email looks good! (Uncommon domain detected)"
    };
  }

  return {
    isValid: true,
    message: "Email looks good!"
  };
};

// Real-time validation with debouncing
export const createDebouncedValidator = (
  validator: (value: string) => ValidationResult,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout;

  return (value: string, callback: (result: ValidationResult) => void) => {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      const result = validator(value);
      callback(result);
    }, delay);
  };
}; 