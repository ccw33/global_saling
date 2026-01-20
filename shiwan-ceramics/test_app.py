#!/usr/bin/env python3
"""
End-to-end test for Shiwan Ceramics E-commerce Site
Tests key pages and functionality
"""

from playwright.sync_api import sync_playwright, Page, Browser
import json
from typing import Dict, Any

# Test configuration
BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = "/tmp/shiwan_ceramics_test_screenshots"

def test_homepage(page: Page):
    """Test homepage loads correctly"""
    print("\n🧪 Testing Homepage...")

    # Navigate to homepage (should redirect to /zh)
    page.goto(f"{BASE_URL}/")
    page.wait_for_load_state("networkidle")

    # Check URL
    assert page.url.endswith("/zh") or page.url == f"{BASE_URL}/", f"Unexpected URL: {page.url}"

    # Check for key elements
    assert page.locator("h1").count() > 0, "No h1 heading found"

    # Check for navigation
    assert page.locator("nav").count() > 0, "No navigation found"

    # Check for Hero section
    hero_text = page.locator("h1").first.text_content()
    assert hero_text, "No hero text found"
    print(f"  ✓ Homepage loaded with hero: '{hero_text[:50]}...'")

    # Check for CTA buttons
    cta_buttons = page.locator("a[href*='/products'], a[href*='/about']").count()
    assert cta_buttons > 0, "No CTA buttons found"
    print(f"  ✓ Found {cta_buttons} CTA buttons")

    # Screenshot
    page.screenshot(path=f"{SCREENSHOT_DIR}/01_homepage.png", full_page=True)
    print("  ✓ Screenshot saved")

    return True


def test_products_page(page: Page):
    """Test products page loads correctly"""
    print("\n🧪 Testing Products Page...")

    # Navigate to products page
    page.goto(f"{BASE_URL}/zh/products")
    page.wait_for_load_state("networkidle")

    # Check for page title
    page_title = page.locator("h1").text_content()
    assert "产品" in page_title or "Products" in page_title, f"Unexpected page title: {page_title}"
    print(f"  ✓ Products page title: '{page_title}'")

    # Check for products grid
    products = page.locator("a[href^='/zh/products/']").all()
    print(f"  ✓ Found {len(products)} product links")

    # Check for category filter
    category_filter = page.locator("a[href*='category=']").count()
    print(f"  ✓ Found {category_filter} category filter links")

    # Screenshot
    page.screenshot(path=f"{SCREENSHOT_DIR}/02_products.png", full_page=True)
    print("  ✓ Screenshot saved")

    return True


def test_language_switching(page: Page):
    """Test language switching functionality"""
    print("\n🧪 Testing Language Switching...")

    # Start on Chinese homepage
    page.goto(f"{BASE_URL}/zh")
    page.wait_for_load_state("networkidle")

    # Click English language button
    english_button = page.locator("a[href='/en']").first
    english_button.click()
    page.wait_for_load_state("networkidle")

    # Check URL changed
    assert "/en/" in page.url or page.url.endswith("/en"), f"URL didn't change to English: {page.url}"
    print(f"  ✓ Language switched to English: {page.url}")

    # Switch back to Chinese
    chinese_button = page.locator("a[href='/zh']").first
    chinese_button.click()
    page.wait_for_load_state("networkidle")

    assert "/zh/" in page.url or page.url.endswith("/zh"), f"URL didn't change to Chinese: {page.url}"
    print(f"  ✓ Language switched back to Chinese: {page.url}")

    return True


def test_currency_switching(page: Page):
    """Test currency switching functionality"""
    print("\n🧪 Testing Currency Switching...")

    page.goto(f"{BASE_URL}/zh/products")
    page.wait_for_load_state("networkidle")

    # Find currency dropdown/button
    currency_button = page.locator("button:has-text('USD'), button:has-text('$')").first

    if currency_button.count() > 0:
        currency_button.click()
        page.wait_for_timeout(500)  # Wait for dropdown to appear

        # Try to click SGD
        sgd_option = page.locator("button:has-text('SGD'), button:has-text('S$')").first
        if sgd_option.count() > 0:
            sgd_option.click()
            page.wait_for_timeout(500)
            print("  ✓ Currency switched to SGD")
        else:
            print("  ⚠ SGD option not found")

        # Screenshot
        page.screenshot(path=f"{SCREENSHOT_DIR}/03_currency_switch.png")
    else:
        print("  ⚠ Currency button not found")

    return True


def test_navigation(page: Page):
    """Test main navigation links"""
    print("\n🧪 Testing Navigation...")

    nav_links = [
        ("首页", "/zh"),
        ("产品", "/zh/products"),
        ("博客", "/zh/blog"),
        ("关于", "/zh/about"),
        ("联系", "/zh/contact"),
    ]

    for link_text, expected_path in nav_links:
        # Try to find and click the link
        link = page.locator(f"a:has-text('{link_text}')").first

        if link.count() > 0:
            link.click()
            page.wait_for_load_state("networkidle")

            # Check URL
            assert expected_path in page.url, f"Navigation failed: expected {expected_path}, got {page.url}"
            print(f"  ✓ Navigated to {link_text}: {page.url}")
        else:
            print(f"  ⚠ Link '{link_text}' not found")

    return True


def test_responsive_design(page: Page):
    """Test responsive design on different screen sizes"""
    print("\n🧪 Testing Responsive Design...")

    screen_sizes = [
        ("Desktop", 1920, 1080),
        ("Tablet", 768, 1024),
        ("Mobile", 375, 667),
    ]

    for name, width, height in screen_sizes:
        page.set_viewport_size({"width": width, "height": height})
        page.goto(f"{BASE_URL}/zh")
        page.wait_for_load_state("networkidle")

        # Screenshot for this size
        page.screenshot(path=f"{SCREENSHOT_DIR}/04_responsive_{name.lower()}.png", full_page=True)
        print(f"  ✓ {name} ({width}x{height}) screenshot saved")

    return True


def test_about_page(page: Page):
    """Test about page"""
    print("\n🧪 Testing About Page...")

    page.goto(f"{BASE_URL}/zh/about")
    page.wait_for_load_state("networkidle")

    # Check for content
    content = page.locator("h1, h2").first.text_content()
    assert content, "No content found on about page"
    print(f"  ✓ About page loaded with title: '{content[:50]}...'")

    # Screenshot
    page.screenshot(path=f"{SCREENSHOT_DIR}/05_about.png", full_page=True)
    print("  ✓ Screenshot saved")

    return True


def test_blog_page(page: Page):
    """Test blog page"""
    print("\n🧪 Testing Blog Page...")

    page.goto(f"{BASE_URL}/zh/blog")
    page.wait_for_load_state("networkidle")

    # Check for blog posts
    blog_links = page.locator("a[href^='/zh/blog/']").all()
    print(f"  ✓ Found {len(blog_links)} blog post links")

    # Screenshot
    page.screenshot(path=f"{SCREENSHOT_DIR}/06_blog.png", full_page=True)
    print("  ✓ Screenshot saved")

    return True


def test_contact_page(page: Page):
    """Test contact page"""
    print("\n🧪 Testing Contact Page...")

    page.goto(f"{BASE_URL}/zh/contact")
    page.wait_for_load_state("networkidle")

    # Check for contact form
    form_inputs = page.locator("input, textarea").all()
    print(f"  ✓ Found {len(form_inputs)} form inputs")

    # Screenshot
    page.screenshot(path=f"{SCREENSHOT_DIR}/07_contact.png", full_page=True)
    print("  ✓ Screenshot saved")

    return True


def run_all_tests():
    """Run all tests and generate report"""
    import os
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)

    print("\n" + "="*60)
    print("🚀 Starting Shiwan Ceramics E2E Tests")
    print("="*60)

    test_results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Enable console logging
        def log_console(msg):
            if msg.type == "error":
                print(f"  🐛 Console Error: {msg.text}")

        page.on("console", log_console)

        try:
            # Run tests
            tests = [
                ("Homepage", test_homepage),
                ("Products Page", test_products_page),
                ("Language Switching", test_language_switching),
                ("Currency Switching", test_currency_switching),
                ("Navigation", test_navigation),
                ("About Page", test_about_page),
                ("Blog Page", test_blog_page),
                ("Contact Page", test_contact_page),
                ("Responsive Design", test_responsive_design),
            ]

            for test_name, test_func in tests:
                try:
                    result = test_func(page)
                    test_results.append((test_name, "PASS", None))
                    print(f"  ✅ {test_name} PASSED")
                except Exception as e:
                    test_results.append((test_name, "FAIL", str(e)))
                    print(f"  ❌ {test_name} FAILED: {e}")

        finally:
            browser.close()

    # Generate report
    print("\n" + "="*60)
    print("📊 Test Results Summary")
    print("="*60)

    passed = sum(1 for _, status, _ in test_results if status == "PASS")
    failed = sum(1 for _, status, _ in test_results if status == "FAIL")

    for test_name, status, error in test_results:
        symbol = "✅" if status == "PASS" else "❌"
        print(f"{symbol} {test_name}: {status}")
        if error:
            print(f"   Error: {error}")

    print(f"\nTotal: {len(test_results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print(f"Success Rate: {passed/len(test_results)*100:.1f}%")
    print(f"\nScreenshots saved to: {SCREENSHOT_DIR}")
    print("="*60)

    return failed == 0


if __name__ == "__main__":
    import sys
    success = run_all_tests()
    sys.exit(0 if success else 1)
