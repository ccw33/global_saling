from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        print("Navigating to homepage...")
        page.goto('http://localhost:3000/zh', wait_until='networkidle')
        print("Page loaded successfully")

        # Take screenshot
        page.screenshot(path='/tmp/homepage_zh.png', full_page=True)
        print("Screenshot saved to /tmp/homepage_zh.png")

        # Check page title
        title = page.title()
        print(f"Page title: {title}")

        # Check for brand introduction
        brand_title = page.locator('h1').first
        print(f"Brand title visible: {brand_title.is_visible()}")

        # Check for navigation links
        nav_links = page.locator('nav a').all()
        print(f"Number of navigation links: {len(nav_links)}")

        # Check for products section
        products_section = page.locator('section:has-text("精选产品")').or_(page.locator('section:has-text("Featured Products")'))
        print(f"Products section visible: {products_section.is_visible()}")

        # Check for blogs section
        blogs_section = page.locator('section:has-text("最新文章")').or_(page.locator('section:has-text("Latest Articles")'))
        print(f"Blogs section visible: {blogs_section.is_visible()}")

        # Check for footer
        footer = page.locator('footer')
        print(f"Footer visible: {footer.is_visible()}")

        print("\nAll checks completed!")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        browser.close()
