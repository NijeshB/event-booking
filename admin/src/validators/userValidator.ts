import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string({ required_error: 'Email is mandatory!' }).trim().email({
    message: 'Invalid email format. Please enter a valid email address!',
  }),
  password: z.string().refine((password) => isStrongPassword(password), {
    message: `Password must be at least 8 characters long and must contain at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, at least 1 special character`,
  }),
  mobile: z.coerce
    .string()
    .length(10, { message: 'Mobile number must be exactly 10 digits.' })
    .regex(/^\d{10}$/, { message: 'Mobile number must contain only digits.' }),
});

export const emailSchema = z
  .string({ required_error: 'Email is mandatory!' })
  .trim()
  .email({
    message: 'Invalid email format. Please enter a valid email address!',
  });

export const mobileSchema = z.object({
  mobile: z.coerce
    .string()
    .length(10, { message: 'Mobile number must be exactly 10 digits.' })
    .regex(/^\d{10}$/, { message: 'Mobile number must contain only digits.' }),
});

// Custom function to validate password strength
const isStrongPassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);

  return (
    password.length >= 8 &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};

export type typeCreateUser = z.infer<typeof createUserSchema>;
export type typeUserProfile = Omit<typeCreateUser, 'password'>;
