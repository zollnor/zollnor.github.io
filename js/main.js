// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // 清除所有活动状态
            navLinks.forEach(link => link.classList.remove('active'));
            // 设置当前链接为活动状态
            this.classList.add('active');
        });
    });
    
    // 监听滚动位置，更新活动的导航链接
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
    
    // 回到顶部按钮
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 联系表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 模拟表单提交
            const formElements = contactForm.elements;
            let isValid = true;
            
            // 简单验证
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('is-invalid');
                } else {
                    formElements[i].classList.remove('is-invalid');
                }
            }
            
            if (isValid) {
                // 成功提交效果
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 发送中...';
                
                // 模拟API请求
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> 发送成功';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // 业务绩效分析图表
    const performanceChartCanvas = document.getElementById('performanceChart');
    if (performanceChartCanvas) {
        const ctx = performanceChartCanvas.getContext('2d');
        
        const performanceChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['收入增长', '成本控制', '运营效率', '现金流管理', '投资回报率', '盈利能力'],
                datasets: [{
                    label: '当前绩效',
                    data: [85, 92, 75, 85, 80, 90],
                    backgroundColor: 'rgba(26, 188, 156, 0.2)',
                    borderColor: 'rgba(26, 188, 156, 1)',
                    pointBackgroundColor: 'rgba(26, 188, 156, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(26, 188, 156, 1)'
                }, {
                    label: '行业平均',
                    data: [70, 65, 60, 75, 68, 72],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: 'rgba(44, 62, 80, 1)',
                    pointBackgroundColor: 'rgba(44, 62, 80, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(44, 62, 80, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 62, 80, 0.8)',
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 12
                    }
                }
            }
        });
    }
    
    // 投资决策模型图表
    const investmentChartCanvas = document.getElementById('investmentChart');
    if (investmentChartCanvas) {
        const ctx = investmentChartCanvas.getContext('2d');
        
        const investmentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['项目A', '项目B', '项目C', '项目D', '项目E'],
                datasets: [{
                    label: '预期回报率(%)',
                    data: [12, 19, 8, 15, 22],
                    backgroundColor: 'rgba(26, 188, 156, 0.7)',
                    borderColor: 'rgba(26, 188, 156, 1)',
                    borderWidth: 1
                }, {
                    label: '风险评分(1-10)',
                    data: [6, 8, 3, 7, 9],
                    backgroundColor: 'rgba(231, 76, 60, 0.7)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // 添加技能进度条动画
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        const skillInfoTexts = document.querySelectorAll('.skill-info p:last-child');
        const percentages = [];
        
        // 从HTML中获取百分比值
        skillInfoTexts.forEach(text => {
            percentages.push(text.textContent.replace('%', ''));
        });
        
        progressBars.forEach((bar, index) => {
            if (index < percentages.length) {
                const width = percentages[index] + '%';
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1s ease-in-out';
                }, 100);
            }
        });
    };
    
    // 使用Intersection Observer API检测元素是否可见
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
    
    // 平滑滚动所有锚链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 为项目卡片添加悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 为技能徽章添加淡入效果
    const skillBadges = document.querySelectorAll('.skill-badge');
    const animateSkillBadges = () => {
        skillBadges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
                badge.style.transition = 'all 0.5s ease';
            }, 100 * index);
        });
    };
    
    // 观察商业技能部分
    const businessSkills = document.querySelector('.skills-card:last-child');
    if (businessSkills) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBadges();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(businessSkills);
    }
    
    // 为时间线项目添加淡入效果
    const timelineItems = document.querySelectorAll('.timeline-item');
    const animateTimelineItems = () => {
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transition = 'all 0.5s ease';
            }, 300 * index);
        });
    };
    
    // 观察经验部分
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTimelineItems();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(experienceSection);
    }
    
    // 月度预算执行率分析图表
    const budgetExecutionChartCanvas = document.getElementById('budgetExecutionChart');
    if (budgetExecutionChartCanvas) {
        const ctx = budgetExecutionChartCanvas.getContext('2d');
        
        const budgetExecutionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['市场部', '销售部', '研发部', '财务部', '人力资源', '行政部'],
                datasets: [{
                    label: '预算执行率(%)',
                    data: [92, 87, 95, 98, 88, 91],
                    backgroundColor: [
                        'rgba(26, 188, 156, 0.7)',
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(155, 89, 182, 0.7)',
                        'rgba(231, 76, 60, 0.7)',
                        'rgba(241, 196, 15, 0.7)'
                    ],
                    borderColor: [
                        'rgba(26, 188, 156, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(231, 76, 60, 1)',
                        'rgba(241, 196, 15, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 62, 80, 0.8)',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 费用趋势分析与预测图表
    const expenseTrendChartCanvas = document.getElementById('expenseTrendChart');
    if (expenseTrendChartCanvas) {
        const ctx = expenseTrendChartCanvas.getContext('2d');
        
        const expenseTrendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '实际费用',
                        data: [352, 358, 365, 372, 368, 380, 375, 385, 392, 396, null, null],
                        borderColor: 'rgba(26, 188, 156, 1)',
                        backgroundColor: 'rgba(26, 188, 156, 0.1)',
                        pointBackgroundColor: 'rgba(26, 188, 156, 1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '预测费用',
                        data: [null, null, null, null, null, null, null, null, null, 396, 402, 408],
                        borderColor: 'rgba(231, 76, 60, 1)',
                        borderDash: [5, 5],
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        pointBackgroundColor: 'rgba(231, 76, 60, 1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '预算基线',
                        data: [350, 350, 350, 375, 375, 375, 380, 380, 380, 400, 400, 400],
                        borderColor: 'rgba(44, 62, 80, 0.5)',
                        pointRadius: 0,
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 300,
                        title: {
                            display: true,
                            text: '费用（千元）'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 62, 80, 0.8)'
                    }
                }
            }
        });
    }
    
    // 费用结构分析图表
    const expenseStructureChartCanvas = document.getElementById('expenseStructureChart');
    if (expenseStructureChartCanvas) {
        const ctx = expenseStructureChartCanvas.getContext('2d');
        
        const expenseStructureChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['人力成本', '运营费用', '市场推广', '研发投入', '行政管理', '其他'],
                datasets: [{
                    label: '占比',
                    data: [42, 18, 15, 12, 8, 5],
                    backgroundColor: [
                        'rgba(26, 188, 156, 0.8)',
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(231, 76, 60, 0.8)',
                        'rgba(241, 196, 15, 0.8)'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 62, 80, 0.8)',
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        });
    }
    
    // 滚动到图表部分时触发动画
    const animateCharts = () => {
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        };
        
        const chartElements = document.querySelectorAll('.canvas-container');
        
        chartElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                // 向上淡入动画
                element.animate([
                    { opacity: 0, transform: 'translateY(30px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 800,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
            }
        });
    };
    
    // 监听滚动事件
    window.addEventListener('scroll', animateCharts);
    // 初始触发一次
    setTimeout(animateCharts, 500);
}); 

// 初始化所有工具提示
document.addEventListener('DOMContentLoaded', function() {
    // 初始化Bootstrap的模态窗口
    var wechatModal = new bootstrap.Modal(document.getElementById('wechatModal'));
    
    // 为微信图标添加点击事件
    document.querySelector('.wechat-icon').addEventListener('click', function(e) {
        e.preventDefault();
        wechatModal.show();
    });
});