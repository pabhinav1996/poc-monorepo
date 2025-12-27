import { test, expect } from '@playwright/test';

test('has title and navigates to operations', async ({ page }) => {
  await page.goto('/');

  // Expect dashboard to load
  await expect(page.locator('h1')).toContainText('Operational Metrics');

  // Navigate to Operations
  await page.click('a[href="/operations"]');

  // Expect URL to change
  await expect(page).toHaveURL(/\/operations/);

  // Expect grid header or text
  await expect(page.locator('h1')).toContainText('Operations / Alert Queue');
  await expect(page.locator('body')).toContainText('Total 300+ record(s)');
});
