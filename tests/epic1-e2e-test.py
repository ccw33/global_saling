#!/usr/bin/env python3
"""
Epic 1 E2E测试：项目初始化和基础配置
"""
from playwright.sync_api import sync_playwright

def test_epic1_initialization():
    """测试Epic 1：项目初始化和基础配置"""
    
    print("=" * 60)
    print("Epic 1 E2E测试开始")
    print("=" * 60)
    
    with sync_playwright() as p:
        # 启动浏览器（headless模式）
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 初始化页面内容变量
        page_content = ""
        
        # 监听控制台日志和错误
        console_messages = []
        errors = []
        
        def handle_console(msg):
            console_messages.append(msg)
            if msg.type == "error":
                errors.append(msg.text)
                print(f"❌ 控制台错误: {msg.text}")
        
        page.on("console", handle_console)
        
        # TC-002: 访问首页
        print("\n[TC-002] 测试首页访问...")
        try:
            page.goto('http://localhost:3000', timeout=10000)
            page.wait_for_load_state('networkidle')
            print(f"✅ 页面加载成功")
            print(f"✅ 页面标题: {page.title()}")
            
            # 检查页面内容
            page_content = page.content()

            # 验证标题
            if "石湾公仔海外独立站" in page.title():
                print(f"✅ 页面标题正确")
            else:
                print(f"❌ 页面标题不正确，预期: '石湾公仔海外独立站'")

            # 验证关键元素
            if "欢迎来到石湾公仔" in page_content:
                print(f"✅ 欢迎语显示正确")
            else:
                print(f"❌ 欢迎语未找到")
            
            # 检查导航卡片
            cards = page.locator('.group').count()
            print(f"✅ 找到 {cards} 个功能卡片")
            
            if cards >= 4:
                print(f"✅ 功能卡片数量符合预期（>=4）")
            else:
                print(f"❌ 功能卡片数量不足")
            
        except Exception as e:
            print(f"❌ TC-002 失败: {e}")
        
        # TC-003: 检查控制台错误
        print("\n[TC-003] 检查控制台错误...")
        print(f"控制台消息总数: {len(console_messages)}")
        print(f"错误数量: {len(errors)}")
        
        # 检查是否有严重错误（排除Watchpack警告）
        critical_errors = [e for e in errors if "Watchpack" not in e]
        
        if len(critical_errors) == 0:
            print(f"✅ 无严重控制台错误")
        else:
            print(f"❌ 发现 {len(critical_errors)} 个严重错误:")
            for error in critical_errors:
                print(f"   - {error}")
        
        # 性能测试
        print("\n[性能测试] 检查页面性能...")
        performance = page.evaluate("() => JSON.stringify(performance.timing)")
        print(f"✅ 页面性能数据已收集")
        
        # 关闭浏览器
        browser.close()
    
    print("\n" + "=" * 60)
    print("Epic 1 E2E测试完成")
    print("=" * 60)
    
    # 测试结果总结
    print("\n测试结果总结:")
    if 'page_content' in locals():
        print(f"- TC-002 (首页访问): {'✅ 通过' if '欢迎来到石湾公仔' in page_content else '❌ 失败'}")
    else:
        print(f"- TC-002 (首页访问): ❌ 失败 (页面未成功加载)")
    print(f"- TC-003 (控制台错误): {'✅ 通过' if len(critical_errors) == 0 else '❌ 失败'}")

if __name__ == "__main__":
    test_epic1_initialization()
