import { test, expect } from '@playwright/test'

test.describe('FEAT-001: Feature Title', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('AC1: given no items exist, the list is empty', async ({ page }) => {
    // Given the entity list page is open
    await page.getByRole('heading', { name: 'Entities' }).waitFor()
    // Then no items are shown
    await expect(page.getByText('No items yet.')).toBeVisible()
  })

  test('AC2: given valid input, when submitted, the item appears in the list', async ({ page }) => {
    // Given the user types a name
    await page.getByRole('textbox', { name: /name/i }).fill('My Entity')
    // When the user submits the form
    await page.getByRole('button', { name: 'Add' }).click()
    // Then the new item appears in the list
    await expect(page.getByText('My Entity')).toBeVisible()
  })
})
