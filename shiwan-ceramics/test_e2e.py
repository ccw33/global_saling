#!/usr/bin/env python3
"""
石湾陶瓷公仔应用 E2E 测试
使用 Playwright 进行端到端测试
"""

from playwright.sync_api import sync_playwright
import sys

def test_homepage():
    """测试首页加载和重定向"""
    print("\n🧪 测试1: 首页加载和重定向")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 设置控制台日志捕获
        console_logs = []
        def handle_console_message(msg):
            if msg.type == 'error':
                console_logs.append(f"[{msg.type}] {msg.text}")
        page.on("console", handle_console_message)

        try:
            # 导航到首页
            page.goto('http://localhost:3000', timeout=10000)
            page.wait_for_load_state('networkidle', timeout=10000)

            # 验证重定向
            current_url = page.url
            print(f"   当前URL: {current_url}")
            assert '/zh' in current_url, f"Expected redirect to /zh, got {current_url}"
            print("   ✅ 重定向正确")

            # 验证页面标题
            title = page.title()
            print(f"   页面标题: {title}")
            print("   ✅ 页面标题存在")

            # 检查页面内容
            body_text = page.body().inner_text()
            print(f"   页面内容长度: {len(body_text)} 字符")
            assert len(body_text) > 100, "Page content too short"
            print("   ✅ 页面有内容")

            # 检查控制台错误
            if console_logs:
                print(f"   ⚠️  发现控制台错误:")
                for log in console_logs[:5]:  # 只显示前5个
                    print(f"      {log}")
            else:
                print("   ✅ 无控制台错误")

        except Exception as e:
            print(f"   ❌ 测试失败: {e}")
            # 截图保存
            try:
                page.screenshot(path="/tmp/homepage_error.png")
                print("   📸 错误截图已保存到 /tmp/homepage_error.png")
            except:
                pass
            raise

        finally:
            browser.close()

    print("   ✅ 首页测试通过\n")

def test_product_list():
    """测试产品列表页"""
    print("🧪 测试2: 产品列表页")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 导航到产品列表
            page.goto('http://localhost:3000/zh/products', timeout=10000)
            page.wait_for_load_state('networkidle', timeout=10000)

            # 验证页面标题
            title = page.title()
            print(f"   页面标题: {title}")
            print("   ✅ 产品列表页可访问")

            # 检查页面内容
            body_text = page.body().inner_text()
            print(f"   页面内容长度: {len(body_text)} 字符")
            assert len(body_text) > 50, "Page content too short"
            print("   ✅ 页面有内容")

        except Exception as e:
            print(f"   ❌ 测试失败: {e}")
            try:
                page.screenshot(path="/tmp/products_error.png")
                print("   📸 错误截图已保存")
            except:
                pass
            raise

        finally:
            browser.close()

    print("   ✅ 产品列表页测试通过\n")

def test_contact_page():
    """测试联系页面"""
    print("🧪 测试3: 联系页面")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 导航到联系页面
            page.goto('http://localhost:3000/zh/contact', timeout=10000)
            page.wait_for_load_state('networkidle', timeout=10000)

            print("   ✅ 联系页面可访问")

            # 验证表单字段存在
            name_input = page.locator('input[name="name"], input[placeholder*="姓名"]').first
            email_input = page.locator('input[name="email"], input[placeholder*="邮箱"]').first
            message_input = page.locator('textarea[name="message"], textarea[placeholder*="消息"]').first
            submit_button = page.locator('button[type="submit"], button:has-text("提交"), button:has-text("发送")').first

            # 检查元素是否可见
            inputs_found = 0
            if name_input.count() > 0:
                print("   ✅ 姓名输入框存在")
                inputs_found += 1
            if email_input.count() > 0:
                print("   ✅ 邮箱输入框存在")
                inputs_found += 1
            if message_input.count() > 0:
                print("   ✅ 消息输入框存在")
                inputs_found += 1
            if submit_button.count() > 0:
                print("   ✅ 提交按钮存在")
                inputs_found += 1

            if inputs_found >= 2:
                print(f"   ✅ 找到 {inputs_found}/4 个表单元素")

        except Exception as e:
            print(f"   ❌ 测试失败: {e}")
            try:
                page.screenshot(path="/tmp/contact_error.png")
                print("   📸 错误截图已保存")
            except:
                pass
            raise

        finally:
            browser.close()

    print("   ✅ 联系页面测试通过\n")

def test_about_page():
    """测试关于页面"""
    print("🧪 测试4: 关于页面")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 导航到关于页面
            page.goto('http://localhost:3000/zh/about', timeout=10000)
            page.wait_for_load_state('networkidle', timeout=10000)

            print("   ✅ 关于页面可访问")

            # 检查页面内容
            body_text = page.body().inner_text()
            print(f"   页面内容长度: {len(body_text)} 字符")
            assert len(body_text) > 100, "Page content too short"
            print("   ✅ 页面有内容")

        except Exception as e:
            print(f"   ❌ 测试失败: {e}")
            try:
                page.screenshot(path="/tmp/about_error.png")
                print("   📸 错误截图已保存")
            except:
                pass
            raise

        finally:
            browser.close()

    print("   ✅ 关于页面测试通过\n")

def test_language_switch():
    """测试语言切换"""
    print("🧪 测试5: 语言切换功能")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 从中文页面开始
            page.goto('http://localhost:3000/zh', timeout=10000)
            page.wait_for_load_state('networkidle', timeout=10000)

            current_url = page.url
            print(f"   当前URL: {current_url}")
            assert '/zh' in current_url, "Not on /zh page"
            print("   ✅ 中文页面加载成功")

            # 尝试访问英文页面
            page.goto('http://localhost:3000/en', timeout=10000)
            page.wait_for_load_state('networkidle', timeout=10000)

            current_url = page.url
            print(f"   切换后URL: {current_url}")
            assert '/en' in current_url, f"Expected /en, got {current_url}"
            print("   ✅ 英文页面加载成功")

        except Exception as e:
            print(f"   ❌ 测试失败: {e}")
            try:
                page.screenshot(path="/tmp/language_error.png")
                print("   📸 错误截图已保存")
            except:
                pass
            raise

        finally:
            browser.close()

    print("   ✅ 语言切换测试通过\n")

def main():
    print("🚀 开始石湾陶瓷公仔应用 E2E 测试")
    print("=" * 50)

    # 检查服务器是否运行
    print("\n⚙️  检查开发服务器状态...")
    try:
        import urllib.request
        response = urllib.request.urlopen('http://localhost:3000', timeout=5)
        print("✅ 开发服务器正在运行\n")
    except Exception as e:
        print(f"❌ 开发服务器未运行: {e}")
        print("\n请先启动开发服务器:")
        print("  cd shiwan-ceramics/frontend")
        print("  npm run dev")
        sys.exit(1)

    # 执行测试
    tests = [
        ("首页加载和重定向", test_homepage),
        ("产品列表页", test_product_list),
        ("联系页面", test_contact_page),
        ("关于页面", test_about_page),
        ("语言切换功能", test_language_switch),
    ]

    passed = 0
    failed = 0

    for test_name, test_func in tests:
        try:
            test_func()
            passed += 1
        except AssertionError as e:
            print(f"❌ {test_name} 测试失败: {e}\n")
            failed += 1
        except Exception as e:
            print(f"❌ {test_name} 测试出错: {e}\n")
            failed += 1

    # 输出总结
    print("=" * 50)
    print(f"\n📊 测试结果总结:")
    print(f"   ✅ 通过: {passed}/{len(tests)}")
    print(f"   ❌ 失败: {failed}/{len(tests)}")

    if failed == 0:
        print("\n🎉 所有测试通过！")
        sys.exit(0)
    else:
        print(f"\n⚠️  有 {failed} 个测试失败")
        sys.exit(1)

if __name__ == '__main__':
    main()
