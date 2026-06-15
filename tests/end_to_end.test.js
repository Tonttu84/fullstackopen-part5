
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login')
  })

  test('Login form is shown', async ({ page }) => {
    const username_field = page.getByLabel('username')
    await expect(username_field).toBeVisible()
    const password_field = page.getByLabel('password')
    await expect(password_field).toBeVisible()

  })

  describe('Login', () => {

    beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login')
  })

    test('succeeds with correct credentials', async ({ page }) => {
        const username_field = page.getByLabel('username')
        await expect(username_field).toBeVisible()
        const password_field = page.getByLabel('password')
        await expect(password_field).toBeVisible()
        const submit_button = page.getByRole('button', { name: 'login' })
        await username_field.fill('testuser')
        await password_field.fill('testuser')
        await submit_button.click()

    await expect(page.getByRole('button', { name: /logout/ })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).not.toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {
      const username_field = page.getByLabel('username')
        await expect(username_field).toBeVisible()
        const password_field = page.getByLabel('password')
        await expect(password_field).toBeVisible()
        const submit_button = page.getByRole('button', { name: 'login' })
        await username_field.fill('fakeuser')
        await password_field.fill('fakepass')
        await submit_button.click()

        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()

    })
  })

  describe('When logged in', () => {
  beforeEach(async ({ page }) => {
  page.on('dialog', dialog => dialog.accept())

  await page.goto('http://localhost:5173/login')

  await page.getByLabel('username').fill('testuser')
  await page.getByLabel('password').fill('testuser')
  await page.getByRole('button', { name: 'login' }).click()

  await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

	while (await page.getByRole('link', { name: /testAuthor/ }).count() > 0) {

		const newLink = page
		  .getByRole('link', { name: /testAuthor/ })
		  .first()

		await newLink.click()

		const deleteButton = page.getByRole('button', { name: 'REMOVE' })

		if (await deleteButton.count() > 0) {
		  await deleteButton.click()
		}
		await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

		await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
	  }

	  await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
})

  test('a new blog can be created', async ({ page }) => {

	await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

    //make sure the blog is not already there
    await expect(page.getByText('testTitle')).toHaveCount(0)

    await expect(page.getByRole('link', { name: 'new blog' })).toBeVisible()
	await page.getByRole('link', { name: 'new blog' }).click()

    const title =  page.getByLabel('title')
    await expect(title).toBeVisible()
    const author =  page.getByLabel('author')
    await expect(author).toBeVisible()
    const url =  page.getByLabel('url')
    await expect(url).toBeVisible()
    await title.fill('testTitle')
    await author.fill('testAuthor')
    await url.fill('testUrl')

    const submitButton = page.getByRole('button', { name: 'create' })
    await submitButton.click()

    await expect(page.getByRole('link', { name: /testTitle/ })).toBeVisible()

  })

   test('an existing blog can be liked', async ({ page }) => {

    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    //make sure the blog is not already there
	await page.getByRole('link', { name: 'new blog' }).click()
    await expect(page.getByText('testTitle')).toHaveCount(0)

    const title =  page.getByLabel('title')
    await expect(title).toBeVisible()
    const author =  page.getByLabel('author')
    await expect(author).toBeVisible()
    const url =  page.getByLabel('url')
    await expect(url).toBeVisible()
    await title.fill('testTitle')
    await author.fill('testAuthor')
    await url.fill('testUrl')
	await page.getByRole('button', { name: 'create' }).click()

	await expect(page.getByRole('link', { name: /testTitle/ })).toBeVisible()

    //We have now added the testblog
    await page.getByRole('link', { name: /testTitle/ }).click()

	await page.getByRole('button', { name: /logout/ })
	await expect(page.getByText('0 likes')).toBeVisible()

 const likeButton = await page.getByRole('button', { name: 'LIKE' })
 await likeButton.click()
 await expect(page.getByText('1 likes')).toBeVisible()

  })

  test('creator of the blog can delete it', async ({ page }) => {

    await expect(page.getByRole('button', { name: /logout/ })).toBeVisible()
    //make sure the blog is not already there
	await page.getByRole('link', { name: 'new blog' }).click()
    await expect(page.getByText('testTitle')).toHaveCount(0)

    const title =  page.getByLabel('title')
    await expect(title).toBeVisible()
    const author =  page.getByLabel('author')
    await expect(author).toBeVisible()
    const url =  page.getByLabel('url')
    await expect(url).toBeVisible()
    await title.fill('testTitle')
    await author.fill('testAuthor')
    await url.fill('testUrl')

    const submitButton = page.getByRole('button', { name: 'create' })
    await submitButton.click()

    await expect(page.getByRole('link', { name: /testTitle/ })).toBeVisible()

    //We have now added the testblog
	await page.getByRole('link', { name: /testTitle/ }).click()

 const deleteButton =  page.getByRole('button', { name: /REMOVE/ })
 await deleteButton.click()
 await page.getByRole('button', { name: /logout/ }).waitFor()

 await expect(page.getByRole('link', { name: /testTitle/ })).not.toBeVisible()

  })

  test('Delete button doesnt appear for non-owners', async ({ page }) => {

	await page.getByRole('button', { name: /logout/ }).waitFor()

	const blog = page.getByRole('link', { name: /Bob Blog/ })

	await expect(blog).toHaveCount(1)

     await blog.click()

    await expect(blog.getByRole('button', { name: 'REMOVE' })).toHaveCount(0)

  })
  test('Likes are sorted in descending order', async ({ page }) => {

    const blogs = page.getByTestId('blog')

    const count = await blogs.count()

    const likes = []

    for (let i = 0; i < count; i++) {
      const blog = blogs.nth(i)

       const likesText = await blog.locator('.likes').textContent()

       likes.push(Number(likesText.match(/\d+/)[0]))

    }

    for (let i = 0; i < likes.length; i++) {
      if (i === 0) continue

      const current = likes[i]
      const previous = likes[i - 1]

    expect(current).toBeLessThanOrEqual(previous)
}

  })
})


})
