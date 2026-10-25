import type { Inventory } from '../../../../shared-infra';

export const reserveSeats = (inventory: Inventory) => async (e: { quantity: number }) => {
  await inventory.reserve(e.quantity);
};

// Compensation: give the seats back when payment fails.
export const releaseSeats = (inventory: Inventory) => async (e: { quantity: number }) => {
  await inventory.release(e.quantity);
};
