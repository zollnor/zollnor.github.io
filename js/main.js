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
        
        // 定义不同视角的财务数据 - 调整为保险业指标
        const financeData = {
            performance: {
                labels: ['综合成本率', '赔付率', '费用率', '承保利润率', '其他收益率', '保单续保率'],
                datasets: [{
                    label: '当前绩效',
                    data: [96.2, 65.3, 30.9, 3.8, 4.8, 87.5],
                    backgroundColor: 'rgba(26, 188, 156, 0.2)',
                    borderColor: 'rgba(26, 188, 156, 1)',
                    pointBackgroundColor: 'rgba(26, 188, 156, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(26, 188, 156, 1)'
                }, {
                    label: '行业平均',
                    data: [98.5, 70.2, 28.3, 1.5, 4.2, 82.1],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: 'rgba(44, 62, 80, 1)',
                    pointBackgroundColor: 'rgba(44, 62, 80, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(44, 62, 80, 1)'
                }]
            },
            growth: {
                labels: ['新单保费增长', '保单件数增长', '客户数增长', '新业务价值率', '交叉销售率', '代理人产能'],
                datasets: [{
                    label: '当前增长',
                    data: [12.5, 18.3, 15.7, 38.4, 25.2, 32.6],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
                }, {
                    label: '行业平均',
                    data: [8.7, 11.5, 10.2, 32.8, 18.6, 28.3],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: 'rgba(44, 62, 80, 1)',
                    pointBackgroundColor: 'rgba(44, 62, 80, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(44, 62, 80, 1)'
                }]
            },
            risk: {
                labels: ['偿付能力充足率', '准备金充足率', '再保险覆盖率', '大灾风险敞口', '投资风险系数', '流动性比率'],
                datasets: [{
                    label: '当前风险指标',
                    data: [232, 106, 78, 25, 18, 152],
                    backgroundColor: 'rgba(155, 89, 182, 0.2)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    pointBackgroundColor: 'rgba(155, 89, 182, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(155, 89, 182, 1)'
                }, {
                    label: '监管要求/行业平均',
                    data: [150, 100, 65, 35, 25, 120],
                    backgroundColor: 'rgba(44, 62, 80, 0.2)',
                    borderColor: 'rgba(44, 62, 80, 1)',
                    pointBackgroundColor: 'rgba(44, 62, 80, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(44, 62, 80, 1)'
                }]
            }
        };
        
        // 初始化图表
        let performanceChart = new Chart(ctx, {
            type: 'radar',
            data: financeData.performance,
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
                        padding: 12,
                        callbacks: {
                            afterLabel: function(context) {
                                const perspectiveButtons = document.querySelectorAll('.finance-filters button');
                                let activePerspective = 'performance';
                                
                                perspectiveButtons.forEach(btn => {
                                    if (btn.classList.contains('active')) {
                                        activePerspective = btn.getAttribute('data-perspective');
                                    }
                                });
                                
                                // 根据不同视角提供额外信息 - 保险业专用解释
                                if (activePerspective === 'performance') {
                                    const labels = financeData.performance.labels;
                                    const index = context.dataIndex;
                                    
                                    if (labels[index] === '综合成本率') {
                                        return '低于100%表示承保盈利';
                                    } else if (labels[index] === '赔付率') {
                                        return '同比降低 2.1%';
                                    } else if (labels[index] === '承保利润率') {
                                        return '行业领先水平';
                                    }
                                    return '较上季度: ' + (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 2).toFixed(1) + '%';
                                } else if (activePerspective === 'growth') {
                                    const labels = financeData.growth.labels;
                                    const index = context.dataIndex;
                                    
                                    if (labels[index] === '新业务价值率') {
                                        return '高于行业平均 5.6%';
                                    } else if (labels[index] === '代理人产能') {
                                        return '同比提升 15.3%';
                                    }
                                    return '增长趋势: ' + ['强劲', '稳定', '低速'][Math.floor(Math.random() * 3)];
                                } else {
                                    const labels = financeData.risk.labels;
                                    const index = context.dataIndex;
                                    
                                    if (labels[index] === '偿付能力充足率') {
                                        return '远高于监管要求的150%';
                                    } else if (labels[index] === '再保险覆盖率') {
                                        return '优于行业平均13%';
                                    }
                                    return '风险水平: ' + ['低', '适中', '需关注'][Math.floor(Math.random() * 3)];
                                }
                            }
                        }
                    }
                },
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 0.8,
                        to: 0.2,
                        loop: true
                    }
                }
            }
        });
        
        // 添加视角切换功能
        const perspectiveButtons = document.querySelectorAll('.finance-filters button');
        if (perspectiveButtons.length > 0) {
            perspectiveButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // 更新按钮状态
                    perspectiveButtons.forEach(btn => btn.classList.remove('active', 'btn-primary'));
                    perspectiveButtons.forEach(btn => btn.classList.add('btn-light'));
                    this.classList.remove('btn-light');
                    this.classList.add('active', 'btn-primary');
                    
                    // 获取视角类型
                    const perspective = this.getAttribute('data-perspective');
                    
                    // 更新图表数据
                    performanceChart.data = financeData[perspective];
                    
                    // 根据不同视角调整图表配置
                    if (perspective === 'risk') {
                        // 风险视角使用不同的刻度范围
                        performanceChart.options.scales.r.suggestedMax = 250;
                        performanceChart.options.scales.r.ticks.stepSize = 50;
                    } else {
                        performanceChart.options.scales.r.suggestedMax = 100;
                        performanceChart.options.scales.r.ticks.stepSize = 20;
                    }
                    
                    performanceChart.update();
                    
                    // 更新财务指标卡片
                    updateFinanceMetrics(perspective);
                });
            });
        }
        
        // 时间段选择功能
        const periodSelect = document.querySelector('.finance-period-select select');
        if (periodSelect) {
            periodSelect.addEventListener('change', function() {
                const activePerspective = document.querySelector('.finance-filters button.active').getAttribute('data-perspective');
                const selectedPeriod = this.value;
                
                // 显示加载状态
                const chartContainer = document.querySelector('.canvas-container');
                chartContainer.classList.add('loading');
                
                // 为图表添加加载效果
                const loadingOverlay = document.createElement('div');
                loadingOverlay.className = 'chart-loading';
                loadingOverlay.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">加载中...</span></div>';
                chartContainer.appendChild(loadingOverlay);
                
                // 稍微延迟以显示加载效果
                setTimeout(() => {
                    // 为当前视角准备不同时间段的预设数据
                    let currentDataset, benchmarkDataset;
                    
                    if (selectedPeriod === '当前季度') {
                        // 使用原始数据
                        currentDataset = [...financeData[activePerspective].datasets[0].data];
                        benchmarkDataset = [...financeData[activePerspective].datasets[1].data];
                    } else if (selectedPeriod === '过去12个月') {
                        // 准备过去12个月的数据
                        if (activePerspective === 'performance') {
                            currentDataset = [95.8, 64.7, 31.1, 4.2, 5.1, 86.3];
                            benchmarkDataset = [98.0, 69.5, 28.5, 2.0, 4.5, 81.5];
                        } else if (activePerspective === 'growth') {
                            currentDataset = [10.8, 16.5, 13.2, 36.9, 23.8, 30.4];
                            benchmarkDataset = [7.9, 10.2, 9.6, 31.5, 17.2, 26.8];
                        } else { // risk
                            currentDataset = [225, 104, 75, 28, 20, 145];
                            benchmarkDataset = [150, 100, 65, 35, 25, 120];
                        }
                    } else { // 过去3年
                        // 准备过去3年的数据
                        if (activePerspective === 'performance') {
                            currentDataset = [97.5, 67.2, 30.3, 2.5, 4.3, 84.2];
                            benchmarkDataset = [99.5, 72.1, 27.4, 0.5, 3.8, 80.3];
                        } else if (activePerspective === 'growth') {
                            currentDataset = [8.7, 14.3, 11.5, 34.2, 21.5, 28.7];
                            benchmarkDataset = [6.5, 9.8, 8.4, 30.2, 16.8, 25.1];
                        } else { // risk
                            currentDataset = [210, 102, 70, 32, 22, 135];
                            benchmarkDataset = [145, 100, 65, 35, 25, 115];
                        }
                    }
                    
                    // 更新图表数据
                    performanceChart.data.datasets[0].data = currentDataset;
                    performanceChart.data.datasets[1].data = benchmarkDataset;
                    
                    // 更新图表标题
                    performanceChart.options.plugins.title = {
                        display: true,
                        text: getChartTitle(activePerspective, selectedPeriod),
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 15
                        }
                    };
                    
                    // 应用动画效果
                    performanceChart.options.animation = {
                        duration: 800,
                        easing: 'easeOutQuart'
                    };
                    
                    // 更新图表
                    performanceChart.update();
                    
                    // 更新指标卡片，传递时间段参数
                    updateFinanceMetrics(activePerspective, selectedPeriod);
                    
                    // 更新渠道数据
                    updateChannelData();
                    
                    // 移除加载效果
                    setTimeout(() => {
                        chartContainer.classList.remove('loading');
                        if (loadingOverlay.parentNode) {
                            loadingOverlay.parentNode.removeChild(loadingOverlay);
                        }
                    }, 300);
                    
                }, 400);
            });
        }
        
        // 获取图表标题
        function getChartTitle(perspective, period) {
            const perspectiveText = {
                'performance': '业务绩效指标',
                'growth': '增长指标',
                'risk': '风险管理指标'
            }[perspective] || '业务指标';
            
            return `${period}${perspectiveText}分析`;
        }
        
        // 更新财务指标卡片 - 保险业指标
        function updateFinanceMetrics(perspective, period = '当前季度') {
            const metricCards = document.querySelectorAll('.finance-metric-card');
            if (metricCards.length === 0) return;
            
            // 根据不同视角和时间段更新指标
            if (perspective === 'performance') {
                if (period === '当前季度') {
                    updateMetricCard(metricCards[0], '综合成本率', '96.2%', 'positive', '1.8%');
                    updateMetricCard(metricCards[1], '赔付率', '65.3%', 'positive', '2.1%');
                    updateMetricCard(metricCards[2], '保费继续率', '87.5%', 'positive', '1.7%');
                    updateMetricCard(metricCards[3], '投资收益率', '4.8%', 'negative', '0.3%');
                } else if (period === '过去12个月') {
                    updateMetricCard(metricCards[0], '综合成本率', '95.8%', 'positive', '2.2%');
                    updateMetricCard(metricCards[1], '赔付率', '64.7%', 'positive', '2.5%');
                    updateMetricCard(metricCards[2], '保费继续率', '86.3%', 'positive', '1.2%');
                    updateMetricCard(metricCards[3], '投资收益率', '5.1%', 'positive', '0.6%');
                } else { // 过去3年
                    updateMetricCard(metricCards[0], '综合成本率', '97.5%', 'positive', '1.0%');
                    updateMetricCard(metricCards[1], '赔付率', '67.2%', 'positive', '1.3%');
                    updateMetricCard(metricCards[2], '保费继续率', '84.2%', 'positive', '0.5%');
                    updateMetricCard(metricCards[3], '投资收益率', '4.3%', 'negative', '0.5%');
                }
            } else if (perspective === 'growth') {
                if (period === '当前季度') {
                    updateMetricCard(metricCards[0], '新单保费增长', '12.5%', 'positive', '3.8%');
                    updateMetricCard(metricCards[1], '新业务价值率', '38.4%', 'positive', '5.6%');
                    updateMetricCard(metricCards[2], '客户增长率', '15.7%', 'positive', '2.3%');
                    updateMetricCard(metricCards[3], '代理人产能', '¥32.6万', 'positive', '15.3%');
                } else if (period === '过去12个月') {
                    updateMetricCard(metricCards[0], '新单保费增长', '10.8%', 'positive', '2.9%');
                    updateMetricCard(metricCards[1], '新业务价值率', '36.9%', 'positive', '5.4%');
                    updateMetricCard(metricCards[2], '客户增长率', '13.2%', 'positive', '1.8%');
                    updateMetricCard(metricCards[3], '代理人产能', '¥30.4万', 'positive', '13.6%');
                } else { // 过去3年
                    updateMetricCard(metricCards[0], '新单保费增长', '8.7%', 'positive', '2.2%');
                    updateMetricCard(metricCards[1], '新业务价值率', '34.2%', 'positive', '4.0%');
                    updateMetricCard(metricCards[2], '客户增长率', '11.5%', 'positive', '1.7%');
                    updateMetricCard(metricCards[3], '代理人产能', '¥28.7万', 'positive', '10.5%');
                }
            } else { // risk
                if (period === '当前季度') {
                    updateMetricCard(metricCards[0], '偿付能力充足率', '232%', 'positive', '18%');
                    updateMetricCard(metricCards[1], '准备金充足率', '106%', 'positive', '2%');
                    updateMetricCard(metricCards[2], '再保险覆盖率', '78%', 'positive', '5%');
                    updateMetricCard(metricCards[3], '流动性比率', '152%', 'positive', '7%');
                } else if (period === '过去12个月') {
                    updateMetricCard(metricCards[0], '偿付能力充足率', '225%', 'positive', '15%');
                    updateMetricCard(metricCards[1], '准备金充足率', '104%', 'positive', '1%');
                    updateMetricCard(metricCards[2], '再保险覆盖率', '75%', 'positive', '4%');
                    updateMetricCard(metricCards[3], '流动性比率', '145%', 'positive', '5%');
                } else { // 过去3年
                    updateMetricCard(metricCards[0], '偿付能力充足率', '210%', 'positive', '12%');
                    updateMetricCard(metricCards[1], '准备金充足率', '102%', 'positive', '0.5%');
                    updateMetricCard(metricCards[2], '再保险覆盖率', '70%', 'positive', '2%');
                    updateMetricCard(metricCards[3], '流动性比率', '135%', 'positive', '3%');
                }
            }
            
            // 更新指标卡片动画
            metricCards.forEach(card => {
                card.classList.add('updated');
                setTimeout(() => {
                    card.classList.remove('updated');
                }, 1000);
            });
        }
        
        // 更新渠道数据
        function updateChannelData() {
            const channelCards = document.querySelectorAll('.channel-card');
            const selectedPeriod = document.querySelector('.finance-period-select select').value;
            
            if (channelCards.length === 0) return;
            
            // 根据所选时间段模拟不同的渠道数据
            if (selectedPeriod === '当前季度') {
                updateChannelCard(channelCards[0], '代理人渠道', '52%', 'success', '领先', '78%');
                updateChannelCard(channelCards[1], '银保渠道', '33%', 'warning', '稳定', '65%');
                updateChannelCard(channelCards[2], '电子渠道', '15%', 'info', '增长', '45%');
            } else if (selectedPeriod === '过去12个月') {
                updateChannelCard(channelCards[0], '代理人渠道', '48%', 'success', '领先', '72%');
                updateChannelCard(channelCards[1], '银保渠道', '38%', 'warning', '稳定', '68%');
                updateChannelCard(channelCards[2], '电子渠道', '14%', 'info', '增长', '42%');
            } else {
                updateChannelCard(channelCards[0], '代理人渠道', '56%', 'success', '领先', '82%');
                updateChannelCard(channelCards[1], '银保渠道', '31%', 'warning', '下降', '58%');
                updateChannelCard(channelCards[2], '电子渠道', '13%', 'info', '起步', '38%');
            }
        }
        
        // 更新单个渠道卡片
        function updateChannelCard(card, title, percent, status, statusText, progressPercent) {
            const titleElement = card.querySelector('.d-flex span:first-child');
            const statusBadge = card.querySelector('.badge');
            const progressBar = card.querySelector('.progress-bar');
            const percentElement = card.querySelector('.d-flex span.small');
            
            if (titleElement) titleElement.textContent = title;
            if (statusBadge) {
                statusBadge.className = `badge bg-${status}`;
                statusBadge.textContent = statusText;
            }
            if (progressBar) {
                progressBar.className = `progress-bar bg-${status}`;
                progressBar.style.width = progressPercent;
            }
            if (percentElement) percentElement.textContent = percent;
            
            // 添加更新动画
            card.classList.add('updated');
            setTimeout(() => {
                card.classList.remove('updated');
            }, 1000);
        }
        
        // 更新单个指标卡片
        function updateMetricCard(card, title, value, changeType, changeValue) {
            const titleElement = card.querySelector('.metric-title');
            const valueElement = card.querySelector('h5');
            const changeElement = card.querySelector('.metric-change');
            
            if (titleElement) titleElement.textContent = title;
            if (valueElement) valueElement.textContent = value;
            
            if (changeElement) {
                changeElement.className = 'metric-change ' + changeType;
                
                // 对于保险业，有些指标下降是好事（如综合成本率、赔付率），有些是坏事
                let icon = 'fa-arrow-up';
                if (title === '综合成本率' || title === '赔付率') {
                    icon = changeType === 'positive' ? 'fa-arrow-down' : 'fa-arrow-up';
                } else {
                    icon = changeType === 'positive' ? 'fa-arrow-up' : 'fa-arrow-down';
                }
                
                if (changeType === 'neutral') icon = 'fa-minus';
                
                changeElement.innerHTML = `<i class="fas ${icon}"></i> ${changeValue}`;
            }
        }
    }
    
    // 投资决策模型图表
    const investmentChartCanvas = document.getElementById('investmentChart');
    if (investmentChartCanvas) {
        const ctx = investmentChartCanvas.getContext('2d');
        
        // 定义不同视角的数据
        const decisionModelData = {
            financial: {
                labels: ['产业链数字化转型', '企业级SaaS平台投资', '新市场拓展计划', '扩展新渠道', '并购竞争对手'],
                datasets: [{
                    label: '预期年化回报率(%)',
                    data: [18.5, 22.3, 15.8, 12.2, 9.7],
                    backgroundColor: 'rgba(26, 188, 156, 0.7)',
                    borderColor: 'rgba(26, 188, 156, 1)',
                    borderWidth: 1
                }, {
                    label: '风险评分(1-10)',
                    data: [6.8, 7.2, 5.5, 4.3, 8.6],
                    backgroundColor: 'rgba(231, 76, 60, 0.7)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 1
                }, {
                    label: '投资回收期(年)',
                    data: [3.2, 2.8, 4.1, 5.5, 6.2],
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            risk: {
                labels: ['产业链数字化转型', '企业级SaaS平台投资', '新市场拓展计划', '扩展新渠道', '并购竞争对手'],
                datasets: [{
                    label: '市场风险',
                    data: [6.8, 5.9, 7.5, 3.2, 8.1],
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }, {
                    label: '技术风险',
                    data: [7.2, 6.3, 4.5, 6.8, 3.4],
                    backgroundColor: 'rgba(155, 89, 182, 0.7)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 1
                }, {
                    label: '运营风险',
                    data: [5.6, 4.8, 6.2, 5.1, 7.8],
                    backgroundColor: 'rgba(241, 196, 15, 0.7)',
                    borderColor: 'rgba(241, 196, 15, 1)',
                    borderWidth: 1
                }, {
                    label: '政策监管风险',
                    data: [4.2, 3.6, 7.8, 2.5, 8.9],
                    backgroundColor: 'rgba(230, 126, 34, 0.7)',
                    borderColor: 'rgba(230, 126, 34, 1)',
                    borderWidth: 1
                }]
            },
            strategic: {
                labels: ['产业链数字化转型', '企业级SaaS平台投资', '新市场拓展计划', '扩展新渠道', '并购竞争对手'],
                datasets: [{
                    label: '战略契合度(%)',
                    data: [92, 88, 78, 65, 70],
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                }, {
                    label: '市场增长潜力(%)',
                    data: [85, 92, 78, 55, 68],
                    backgroundColor: 'rgba(230, 126, 34, 0.7)',
                    borderColor: 'rgba(230, 126, 34, 1)',
                    borderWidth: 1
                }, {
                    label: '长期竞争优势',
                    data: [75, 83, 65, 72, 68],
                    backgroundColor: 'rgba(155, 89, 182, 0.7)',
                    borderColor: 'rgba(155, 89, 182, 1)',
                    borderWidth: 1
                }, {
                    label: 'ESG影响评分',
                    data: [82, 75, 63, 58, 45],
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            }
        };
        
        // 初始化图表
        let investmentChart = new Chart(ctx, {
            type: 'bar',
            data: decisionModelData.financial,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',  // 使用水平条形图更适合展示项目数据
                barPercentage: 0.7,
                categoryPercentage: 0.8,
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            borderDash: [3, 3]
                        },
                        ticks: {
                            font: {
                                size: 11
                            },
                            color: '#666'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            color: '#333'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: '业务项目分析（财务视角）',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#666',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        cornerRadius: 5,
                        padding: 10,
                        usePointStyle: true
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
        
        // 添加视角切换功能
        const viewButtons = document.querySelectorAll('.decision-filters button');
        if (viewButtons.length > 0) {
            viewButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // 更新按钮状态
                    viewButtons.forEach(btn => btn.classList.remove('active', 'btn-primary'));
                    viewButtons.forEach(btn => btn.classList.add('btn-light'));
                    this.classList.remove('btn-light');
                    this.classList.add('active', 'btn-primary');
                    
                    // 获取视角类型
                    const viewType = this.getAttribute('data-view');
                    
                    // 更新图表数据
                    investmentChart.data = decisionModelData[viewType];
                    
                    // 更新图表标题
                    if (viewType === 'financial') {
                        investmentChart.options.plugins.title.text = '项目投资分析（财务视角）';
                        // 更新指标卡片
                        updateDecisionMetrics('企业级SaaS平台投资', '22.3%', '中等', '资本配置效率', '92%', '平均预期回报率', '15.7%', '风险调整后收益', '较行业均值高8.3%');
                    } else if (viewType === 'risk') {
                        investmentChart.options.plugins.title.text = '项目投资分析（风险视角）';
                        // 更新指标卡片
                        updateDecisionMetrics('扩展新渠道', '12.2%', '低', '风险分散程度', '78%', '平均风险敞口', '5.8', '风险缓解计划完成率', '67%');
                    } else {
                        investmentChart.options.plugins.title.text = '项目投资分析（战略视角）';
                        // 更新指标卡片
                        updateDecisionMetrics('产业链数字化转型', '18.5%', '中高', '战略契合度', '92%', '增长潜力', '85%', '竞争优势增强', '较强');
                    }
                    
                    investmentChart.update();
                    
                    // 更新图例
                    updateDecisionLegend(viewType);
                });
            });
            
            // 初始化指标数据 - 默认显示财务视角
            updateDecisionMetrics('企业级SaaS平台投资', '22.3%', '中等', '资本配置效率', '92%', '平均预期回报率', '15.7%', '风险调整后收益', '较行业均值高8.3%');
            
            // 初始化图例
            updateDecisionLegend('financial');
        }
        
        // 更新图例函数
        function updateDecisionLegend(viewType) {
            const legendContainer = document.querySelector('.decision-legend');
            if (!legendContainer) return;
            
            // 清空现有图例
            legendContainer.innerHTML = '';
            
            // 根据视角类型添加新图例
            const datasets = decisionModelData[viewType].datasets;
            datasets.forEach(dataset => {
                const legendItem = document.createElement('div');
                legendItem.className = 'd-flex align-items-center me-3 mb-2';
                legendItem.innerHTML = `
                    <span class="legend-dot" style="background-color: ${dataset.backgroundColor}"></span>
                    <span class="small">${dataset.label}</span>
                `;
                legendContainer.appendChild(legendItem);
            });
        }
        
        // 更新决策指标函数
        function updateDecisionMetrics(projectName, returnRate, riskLevel, metric1Name, metric1Value, metric2Name, metric2Value, metric3Name, metric3Value) {
            // 更新优先推荐项目
            const metricsCard = document.querySelector('.metrics-card');
            if (metricsCard) {
                metricsCard.querySelector('h6 + div h6').textContent = projectName;
                metricsCard.querySelector('.small.text-muted').innerHTML = `预期IRR：${returnRate} | 风险：${riskLevel}`;
            }
            
            // 更新投资组合分析
            const decisionSummary = document.querySelector('.decision-summary');
            if (decisionSummary) {
                const metrics = decisionSummary.querySelectorAll('.d-flex.justify-content-between');
                
                if (metrics[0]) {
                    metrics[0].querySelector('span:first-child').textContent = metric1Name;
                    metrics[0].querySelector('span:last-child').textContent = metric1Value;
                }
                
                if (metrics[1]) {
                    metrics[1].querySelector('span:first-child').textContent = metric2Name;
                    metrics[1].querySelector('span:last-child').textContent = metric2Value;
                }
                
                if (metrics[2]) {
                    metrics[2].querySelector('span:first-child').textContent = metric3Name;
                    metrics[2].querySelector('span:last-child').textContent = metric3Value;
                }
            }
        }
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
    
    // 添加项目卡片动画效果函数
    const animateProjectCards = () => {
        projectCards.forEach((card, index) => {
            // 初始状态设置
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            // 延迟依次显示卡片
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.classList.add('animate-in');
            }, index * 200); // 每张卡片延迟200ms显示
        });
    };
    
    // 观察项目案例部分
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProjectCards();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // 当10%的部分可见时触发
        
        observer.observe(projectsSection);
    }
    
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
// 确保微信模态窗口可以关闭
document.addEventListener('DOMContentLoaded', function() {
    // 获取模态窗口元素
    const wechatModal = document.getElementById('wechatModal');
    
    if (wechatModal) {
        // 为关闭按钮添加点击事件
        const closeButton = wechatModal.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                const modal = bootstrap.Modal.getInstance(wechatModal);
                if (modal) modal.hide();
            });
        }
        
        // 点击模态窗口外部关闭
        wechatModal.addEventListener('click', function(event) {
            if (event.target === wechatModal) {
                const modal = bootstrap.Modal.getInstance(wechatModal);
                if (modal) modal.hide();
            }
        });
    }
});

// 初始化KPI卡片动画效果
document.addEventListener('DOMContentLoaded', function() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    // 为KPI卡片添加动画效果
    const animateKpiCards = () => {
        kpiCards.forEach((card, index) => {
            // 设置初始透明度和位置
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // 依次显示卡片，创造级联效果
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }, index * 150);
            
            // 设置进度条动画
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                const percentage = progressBar.getAttribute('aria-valuenow') || progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, index * 150 + 300);
            }
        });
    };
    
    // 使用交叉观察器检测KPI卡片何时可见
    if (kpiCards.length > 0) {
        const dashboardSection = kpiCards[0].closest('.insight-card');
        if (dashboardSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateKpiCards();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(dashboardSection);
        }
    }
});

// 核心成就指标数字动画效果
document.addEventListener('DOMContentLoaded', function() {
    const metricsCard = document.querySelector('.finance-metrics-card');
    if (!metricsCard) return;
    
    // 为所有指标添加数字动画效果
    const metricValues = metricsCard.querySelectorAll('.metric-content h4');
    
    metricValues.forEach(value => {
        // 获取原始文本
        const originalText = value.textContent;
        let numericPart = '';
        let nonNumericPart = '';
        
        // 分离数字和非数字部分
        for (let i = 0; i < originalText.length; i++) {
            const char = originalText[i];
            if ((!isNaN(parseInt(char)) && char !== ' ') || char === '.') {
                numericPart += char;
            } else {
                nonNumericPart += char;
            }
        }
        
        // 存储原始值用于动画
        value.setAttribute('data-value', numericPart);
        value.setAttribute('data-suffix', nonNumericPart);
        
        // 初始值设为0
        if (numericPart && !isNaN(parseFloat(numericPart))) {
            value.textContent = '0' + nonNumericPart;
        }
    });
    
    // 创建交叉观察器触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 为卡片添加显示动画
                metricsCard.style.transform = 'translateY(-5px)';
                
                // 延迟启动数字计数动画
                setTimeout(() => {
                    metricValues.forEach((value, index) => {
                        setTimeout(() => {
                            animateCounter(value);
                        }, 200 * index);
                    });
                }, 300);
                
                // 为图标添加轻微放大效果
                const metricIcons = metricsCard.querySelectorAll('.metric-icon');
                metricIcons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1)';
                        }, 300);
                    }, 200 * index);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // 数字计数动画函数
    function animateCounter(element) {
        const value = element.getAttribute('data-value');
        const suffix = element.getAttribute('data-suffix');
        
        // 如果不是数字或值为空，不执行动画
        if (!value || isNaN(parseFloat(value))) return;
        
        let startValue = 0;
        let endValue = parseFloat(value);
        const duration = 1500; // 动画持续时间
        const stepTime = 50; // 每次更新的间隔
        
        // 特殊情况处理：小于1的百分比使用不同的步进
        const increment = endValue < 1 ? 0.1 : endValue / (duration / stepTime);
        
        const timer = setInterval(() => {
            startValue += increment;
            
            if (startValue >= endValue) {
                clearInterval(timer);
                startValue = endValue;
            }
            
            // 格式化显示的数字
            let displayValue;
            if (endValue >= 1000) {
                displayValue = Math.round(startValue).toLocaleString();
            } else if (endValue < 1) {
                displayValue = startValue.toFixed(1);
            } else {
                displayValue = Math.round(startValue * 10) / 10;
            }
            
            element.textContent = displayValue + suffix;
        }, stepTime);
    }
    
    observer.observe(metricsCard);
    
    // 为指标项添加悬停效果
    const metricItems = metricsCard.querySelectorAll('.metric-item');
    
    metricItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
});

// 关于我部分动画效果
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const animateAboutSection = () => {
        // 获取所有需要动画的元素
        const aboutContent = aboutSection.querySelector('.about-content');
        const aboutParagraphs = aboutContent.querySelectorAll('p');
        const personalInfo = aboutSection.querySelector('.personal-info');
        const infoItems = personalInfo.querySelectorAll('p');
        const divider = aboutSection.querySelector('.about-section-divider');
        
        // 初始状态设置
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(30px)';
        
        aboutParagraphs.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
        });
        
        if (divider) {
            divider.style.width = '0';
            divider.style.opacity = '0';
        }
        
        personalInfo.style.opacity = '0';
        personalInfo.style.transform = 'translateY(20px)';
        
        infoItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
        });
        
        // 动画序列
        setTimeout(() => {
            aboutContent.style.opacity = '1';
            aboutContent.style.transform = 'translateY(0)';
            aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // 段落依次显示
            aboutParagraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                    p.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    
                    // 显示分隔线
                    if (index === 0 && divider) {
                        setTimeout(() => {
                            divider.style.width = '60px';
                            divider.style.opacity = '1';
                            divider.style.transition = 'width 0.8s ease, opacity 0.8s ease';
                        }, 400);
                    }
                }, 300 * (index + 1));
            });
            
            // 个人信息卡片动画
            setTimeout(() => {
                personalInfo.style.opacity = '1';
                personalInfo.style.transform = 'translateY(0)';
                personalInfo.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                // 信息项依次显示
                infoItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                        item.style.transition = 'all 0.5s ease';
                        
                        // 添加项目前圆点的动画
                        const dot = item.querySelector('::before');
                        if (dot) {
                            dot.style.transform = 'scale(1.2)';
                            dot.style.transition = 'transform 0.3s ease';
                        }
                    }, 150 * index);
                });
            }, 1000);
        }, 300);
    };
    
    // 使用交叉观察器检测何时可见
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAboutSection();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(aboutSection);
    
    // 为高亮文本添加特殊动画
    const highlightedText = aboutSection.querySelectorAll('.about-highlight');
    highlightedText.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.color = '#16a085';
            this.style.textShadow = '0 0 1px rgba(22, 160, 133, 0.3)';
        });
        
        highlight.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.textShadow = '';
        });
    });
});

// 语言能力卡片动画
document.addEventListener('DOMContentLoaded', function() {
    const languageSection = document.querySelector('.language-skills-section');
    if (!languageSection) return;
    
    const languageCards = languageSection.querySelectorAll('.language-card');
    const progressBars = languageSection.querySelectorAll('.language-progress-bar');
    
    // 初始化语言能力进度条动画
    const animateLanguageSkills = () => {
        // 首先重置所有进度条宽度为0
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('style').replace('width: ', '');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 300);
        });
        
        // 为每张卡片添加入场动画
        languageCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }, index * 200 + 100);
        });
    };
    
    // 使用交叉观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLanguageSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(languageSection);
    
    // 添加卡片点击特效
    languageCards.forEach(card => {
        card.addEventListener('click', function() {
            // 图标旋转动画
            const icon = this.querySelector('.language-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 500);
            }
            
            // 卡片缩放效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // 进度条闪烁
            const bar = this.querySelector('.language-progress-bar');
            if (bar) {
                bar.style.boxShadow = '0 0 8px rgba(26, 188, 156, 0.6)';
                setTimeout(() => {
                    bar.style.boxShadow = '';
                }, 500);
            }
        });
    });
});

// 创建客户流失预测模型图表
document.addEventListener('DOMContentLoaded', function() {
    // 获取图表元素
    const churnChartElem = document.getElementById('churnPredictionChart');
    if (!churnChartElem) return;
    
    // 客户细分图表
    const segmentChartElem = document.getElementById('customerSegmentChart');
    
    // 定义数据集
    const allCustomersData = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '高风险客户占比',
                data: [5.2, 5.8, 6.5, 7.3, 8.1, 8.9, 10.2, 11.5, 10.8, 9.5, 8.7, 8.2],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: '中风险客户占比',
                data: [12.3, 13.1, 14.5, 15.8, 16.9, 17.5, 18.3, 19.1, 18.6, 17.2, 16.5, 15.3],
                borderColor: 'rgba(241, 196, 15, 1)',
                backgroundColor: 'rgba(241, 196, 15, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: '低风险客户占比',
                data: [82.5, 81.1, 79.0, 76.9, 75.0, 73.6, 71.5, 69.4, 70.6, 73.3, 74.8, 76.5],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };
    
    // 高风险客户数据
    const highRiskData = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '投诉记录',
                data: [38, 42, 47, 52, 58, 63, 71, 78, 74, 67, 62, 59],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '理赔延迟率',
                data: [12, 14, 17, 21, 24, 27, 31, 36, 32, 29, 25, 22],
                borderColor: 'rgba(241, 196, 15, 1)',
                backgroundColor: 'rgba(241, 196, 15, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '保费上涨幅度',
                data: [25, 28, 33, 39, 44, 48, 54, 59, 57, 52, 48, 44],
                borderColor: 'rgba(155, 89, 182, 1)',
                backgroundColor: 'rgba(155, 89, 182, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '服务满意度',
                data: [42, 40, 37, 33, 30, 28, 24, 21, 23, 27, 30, 33],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '续保率',
                data: [51, 48, 46, 43, 41, 39, 35, 32, 34, 38, 42, 45],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }
        ]
    };
    
    // 中风险客户数据
    const mediumRiskData = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '投诉记录',
                data: [22, 24, 27, 31, 34, 37, 42, 46, 44, 39, 36, 33],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '理赔延迟率',
                data: [8, 9, 11, 13, 15, 17, 19, 22, 20, 18, 16, 14],
                borderColor: 'rgba(241, 196, 15, 1)',
                backgroundColor: 'rgba(241, 196, 15, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '保费上涨幅度',
                data: [15, 17, 20, 23, 25, 28, 31, 34, 32, 29, 27, 25],
                borderColor: 'rgba(155, 89, 182, 1)',
                backgroundColor: 'rgba(155, 89, 182, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '服务满意度',
                data: [65, 64, 62, 60, 58, 56, 54, 52, 53, 57, 60, 63],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '续保率',
                data: [76, 75, 73, 72, 70, 69, 67, 65, 66, 69, 72, 74],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }
        ]
    };
    
    // 低风险客户数据
    const lowRiskData = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '投诉记录',
                data: [8, 7, 9, 10, 11, 10, 12, 13, 12, 10, 9, 8],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '理赔延迟率',
                data: [3, 4, 4, 5, 6, 7, 8, 9, 8, 6, 5, 4],
                borderColor: 'rgba(241, 196, 15, 1)',
                backgroundColor: 'rgba(241, 196, 15, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '保费上涨幅度',
                data: [5, 6, 7, 7, 8, 9, 10, 11, 10, 9, 8, 7],
                borderColor: 'rgba(155, 89, 182, 1)',
                backgroundColor: 'rgba(155, 89, 182, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '服务满意度',
                data: [85, 86, 87, 86, 85, 86, 87, 88, 87, 86, 87, 89],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            },
            {
                label: '续保率',
                data: [91, 92, 93, 92, 91, 92, 93, 94, 93, 92, 93, 95],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }
        ]
    };
    
    // 客户细分数据
    const customerSegmentData = {
        labels: ['获客期(1个月内)', '体验期(2-3个月)', '风险期(4-8个月)', '稳定期(9-12个月)'],
        datasets: [{
            label: '各阶段流失风险',
            data: [3.6, 5.4, 26.5, 4.2],
            backgroundColor: [
                'rgba(52, 152, 219, 0.6)',
                'rgba(46, 204, 113, 0.6)',
                'rgba(231, 76, 60, 0.6)',
                'rgba(155, 89, 182, 0.6)'
            ],
            borderColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(46, 204, 113, 1)',
                'rgba(231, 76, 60, 1)',
                'rgba(155, 89, 182, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 15
        }]
    };
    
    // 创建图表
    const churnChart = new Chart(churnChartElem, {
        type: 'line',
        data: allCustomersData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 5,
                    padding: 10,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: '全部客户流失趋势分析',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 15
                    }
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 10,
                            yMax: 10,
                            borderColor: 'rgba(231, 76, 60, 0.5)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: '高风险警戒线',
                                position: 'end',
                                font: {
                                    size: 11
                                }
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear'
                }
            }
        }
    });
    
    // 创建客户细分图表
    if (segmentChartElem) {
        const segmentChart = new Chart(segmentChartElem, {
            type: 'doughnut',
            data: customerSegmentData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 15,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#666',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        cornerRadius: 5,
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                return `流失率: ${context.raw}%`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: '客户生命周期各阶段流失率',
                        font: {
                            size: 14
                        },
                        padding: {
                            top: 10,
                            bottom: 15
                        }
                    }
                },
                cutout: '60%',
                rotation: -90,
                circumference: 360,
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });
    }
    
    // 添加筛选按钮点击事件
    const churnButtons = document.querySelectorAll('[data-churn]');
    churnButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            churnButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            button.classList.add('active');
            
            // 根据选择的筛选条件更新图表数据
            const filterType = button.getAttribute('data-churn');
            let newData;
            
            switch(filterType) {
                case 'high-risk':
                    newData = highRiskData;
                    break;
                case 'medium-risk':
                    newData = mediumRiskData;
                    break;
                case 'low-risk':
                    newData = lowRiskData;
                    break;
                case 'all':
                    newData = allCustomersData;
                    break;
                default:
                    newData = allCustomersData;
            }
            
            // 添加动画过渡效果
            churnChart.options.animation = {
                duration: 800,
                easing: 'easeOutQuart'
            };
            
            // 更新图表数据
            churnChart.data.labels = newData.labels;
            churnChart.data.datasets = newData.datasets;
            
            // 更新图表标题
            let chartTitle = '客户流失趋势分析';
            switch(filterType) {
                case 'high-risk':
                    chartTitle = '高风险客户流失因素分析';
                    break;
                case 'medium-risk':
                    chartTitle = '中风险客户流失因素分析';
                    break;
                case 'low-risk':
                    chartTitle = '低风险客户流失因素分析';
                    break;
                case 'all':
                    chartTitle = '全部客户流失趋势分析';
                    break;
            }
            
            churnChart.options.plugins.title = {
                display: true,
                text: chartTitle,
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 15
                }
            };
            
            // 更新图表
            churnChart.update();
            
            // 更新筛选按钮样式
            button.classList.add('btn-pulse');
            setTimeout(() => {
                button.classList.remove('btn-pulse');
            }, 500);
        });
    });
    
    // 视图切换按钮
    const viewButtons = document.querySelectorAll('[data-view]');
    const chartViews = document.querySelectorAll('.chart-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            button.classList.add('active');
            
            // 隐藏所有视图
            chartViews.forEach(view => view.classList.remove('active'));
            
            // 显示选中的视图
            const viewType = button.getAttribute('data-view');
            const targetView = document.getElementById(`${viewType}-view`);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });
    
    // 添加流失因素项目的悬停效果
    const churnFactorItems = document.querySelectorAll('.churn-factor-item');
    churnFactorItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
            const progressBar = item.querySelector('.progress-bar');
            progressBar.style.opacity = '0.8';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            const progressBar = item.querySelector('.progress-bar');
            progressBar.style.opacity = '1';
        });
    });
    
    // 添加生命周期阶段的悬停效果
    const lifecycleStages = document.querySelectorAll('.lifecycle-stage');
    lifecycleStages.forEach(stage => {
        stage.addEventListener('mouseenter', () => {
            stage.style.transform = 'translateY(-5px)';
            const icon = stage.querySelector('.lifecycle-icon');
            if (icon) icon.style.transform = 'scale(1.1)';
        });
        
        stage.addEventListener('mouseleave', () => {
            stage.style.transform = 'translateY(0)';
            if (!stage.classList.contains('highlight-stage')) {
                const icon = stage.querySelector('.lifecycle-icon');
                if (icon) icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // 添加混淆矩阵单元格悬停效果
    const matrixCells = document.querySelectorAll('.matrix-cell');
    matrixCells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            cell.style.transform = 'scale(1.05)';
            cell.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            cell.style.zIndex = '1';
        });
        
        cell.addEventListener('mouseleave', () => {
            cell.style.transform = 'scale(1)';
            cell.style.boxShadow = 'none';
            cell.style.zIndex = '0';
        });
    });
    
    // 添加干预策略项目的悬停效果
    const strategyItems = document.querySelectorAll('.strategy-item');
    strategyItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px)';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.07)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.03)';
        });
    });
});

// 添加项目决策模型动画
const animateDecisionModel = () => {
    const decisionElements = document.querySelectorAll('.decision-factor, .decision-table');
    
    decisionElements.forEach(element => {
        if (isInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    // 添加表格行动画
    const tableRows = document.querySelectorAll('.decision-table tbody tr');
    tableRows.forEach((row, index) => {
        if (isInViewport(row)) {
            setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, 100 * index);
        }
    });
}

// 添加财务分析框架动画
const animateFinanceFramework = () => {
    const financeElements = document.querySelectorAll('.finance-metrics .row, .finance-trend, .finance-benchmark, .insurance-channels .row');
    
    financeElements.forEach(element => {
        if (isInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
    
    // 添加指标卡片动画
    const metricCards = document.querySelectorAll('.finance-metric-card, .channel-card');
    metricCards.forEach((card, index) => {
        if (isInViewport(card)) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        }
    });
    
    // 添加财务趋势图表动画
    const sparkPoints = document.querySelectorAll('.spark-point');
    sparkPoints.forEach((point, index) => {
        if (isInViewport(point)) {
            setTimeout(() => {
                point.style.height = point.style.height;
                point.style.opacity = '1';
            }, 50 * index);
        }
    });
    
    // 添加渠道进度条动画
    const channelProgressBars = document.querySelectorAll('.channel-card .progress-bar');
    channelProgressBars.forEach((bar, index) => {
        if (isInViewport(bar)) {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 50);
            }, 200 + (index * 150));
        }
    });
}

// 在窗口滚动和加载时触发动画
window.addEventListener('scroll', () => {
    animateProgressBars();
    animateProjectCards();
    animateSkillBadges();
    animateTimelineItems();
    animateCharts();
    animateKpiCards();
    animateDecisionModel();
    animateFinanceFramework();
});

window.addEventListener('load', () => {
    animateProgressBars();
    animateProjectCards();
    animateSkillBadges();
    animateTimelineItems();
    animateCharts();
    animateKpiCards();
    animateDecisionModel();
    animateFinanceFramework();
});