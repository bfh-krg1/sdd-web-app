import { test, expect } from '@playwright/test'

test.describe('FEAT-001: Feature Title', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('AC1: given no items exist, the list is empty', async ({ page }) => {
    await page.getByRole('heading', { name: 'Entities' }).waitFor()
    await expect(page.getByText('No items yet.')).toBeVisible()
  })

  test('AC2: given valid input, when submitted, the item appears in the list', async ({ page }) => {
    await page.getByRole('textbox', { name: /name/i }).fill('My Entity')
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('My Entity')).toBeVisible()
  })
})
