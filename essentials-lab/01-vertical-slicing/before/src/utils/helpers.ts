import { randomUUID } from 'node:crypto';

export const generateId = () => randomUUID();

export const validateEmail = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

export const isValidQuantity = (quantity: number) => Number.isInteger(quantity) && quantity >= 1 && quantity <= 10;

export const formatCount = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;
