const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://172.26.91.253:3000')
    })

    test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('root')
    await textboxes[1].fill('666666')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('root logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('root')
      await textboxes[1].fill('666666')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByRole('textbox').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })  
})

