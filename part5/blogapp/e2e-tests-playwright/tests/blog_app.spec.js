const { test, describe, beforeEach, expect } = require('@playwright/test')

const newBlog = {
  title: 'Test Blog Title',
  author: 'Test Author',
  url: 'http://testurl.com'
}

const testUser = {
        name: 'admin',
        username: 'root',
        password: '666666'
    }

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: testUser
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    const usernameInput = page.locator('input[name="username"]')
    await expect(usernameInput).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()

      await page.fill('input[name="username"]', testUser.username)
      await page.fill('input[name="password"]', testUser.password)

      await page.click('button[type="submit"]')

      await expect(page.getByText(`${testUser.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()

      await page.fill('input[name="username"]', 'wronguser')
      await page.fill('input[name="password"]', 'wrongpass')

      await page.click('button[type="submit"]')

      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password123'
      }
    })

    const response = await request.post('http://localhost:3003/api/login', {
      data: {
        username: 'testuser',
        password: 'password123'
      }
    })
    const loginData = await response.json()

    await page.goto('http://localhost:5173')
    await page.addInitScript((token) => {
      window.localStorage.setItem('loggedUser', JSON.stringify(token))
    }, loginData)

    await page.reload()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'ADD blog' }).click()

    await page.fill('input[name="title"]', newBlog.title)
    await page.fill('input[name="author"]', newBlog.author)
    await page.fill('input[name="url"]', newBlog.url)

    await page.click('button[type="submit"]')

    await expect(page.getByText('a new blog "Test Blog Title" by Test Author added')).toBeVisible()
  })
})