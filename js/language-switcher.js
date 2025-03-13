// 当前语言
let currentLang = 'zh';

// 初始化语言切换功能
function initLanguageSwitcher() {
    // 创建语言切换按钮
    const langButton = document.createElement('button');
    langButton.className = 'btn btn-outline-primary position-fixed top-0 end-0 m-3';
    langButton.id = 'langSwitch';
    langButton.innerHTML = translations[currentLang].switchToEnglish;
    document.body.appendChild(langButton);

    // 添加点击事件
    langButton.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        updateLanguage();
        langButton.innerHTML = translations[currentLang].switchToEnglish;
    });

    // 初始化页面语言
    updateLanguage();
}

// 更新页面语言
function updateLanguage() {
    // 更新所有带有 data-translate 属性的元素
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });

    // 更新页面标题和描述
    document.title = translations[currentLang].title;
    document.querySelector('meta[name="description"]').content = translations[currentLang].description;
}

// 页面加载完成后初始化语言切换功能
document.addEventListener('DOMContentLoaded', initLanguageSwitcher); 