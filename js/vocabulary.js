// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 显示第一个单词卡片
  const firstCard = document.querySelector('.vocab-card');
  if (firstCard) {
    firstCard.style.display = 'block';
  }
});

// 切换内容区域
document.addEventListener('click', function(e) {
  if (e.target.closest('.action-btn[data-section]')) {
    const btn = e.target.closest('.action-btn');
    const sectionId = btn.getAttribute('data-section');
    const card = btn.closest('.vocab-card');
    
    // 更新按钮状态
    card.querySelectorAll('.action-btn').forEach(button => {
      button.classList.remove('active');
    });
    btn.classList.add('active');
    
    // 更新内容区域
    card.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    card.querySelector('#' + sectionId).classList.add('active');
  }
});

// 切换到下一个单词
function showNextWord(currentWord) {
  const cards = document.querySelectorAll('.vocab-card');
  let currentIndex = -1;

  // 找到当前单词的索引
  cards.forEach((card, index) => {
    if (card.getAttribute('data-word') === currentWord) {
      currentIndex = index;
    }
  });

  // 计算下一个索引（循环）
  const nextIndex = (currentIndex + 1) % cards.length;

  // 隐藏当前卡片，显示下一个卡片
  cards.forEach((card, index) => {
    card.style.display = index === nextIndex ? 'block' : 'none';
  });
}

// 切换到上一个单词
function showPrevWord(currentWord) {
  const cards = document.querySelectorAll('.vocab-card');
  let currentIndex = -1;

  // 找到当前单词的索引
  cards.forEach((card, index) => {
    if (card.getAttribute('data-word') === currentWord) {
      currentIndex = index;
    }
  });

  // 计算上一个索引（循环）
  const prevIndex = (currentIndex - 1 + cards.length) % cards.length;

  // 隐藏当前卡片，显示上一个卡片
  cards.forEach((card, index) => {
    card.style.display = index === prevIndex ? 'block' : 'none';
  });
}

// 文本朗读功能
function speakText(text, button) {
  if ('speechSynthesis' in window) {
    // 保存原始按钮内容
    const originalContent = button.innerHTML;
    // 显示加载指示器
    button.innerHTML = '<div class="loading-indicator"></div>';
    button.disabled = true;
    
    // 停止任何正在进行的语音
    window.speechSynthesis.cancel();
    
    // 创建语音实例
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // 稍慢一点便于学习
    
    // 语音播放完成后恢复按钮状态
    utterance.onend = function() {
      button.innerHTML = originalContent;
      button.disabled = false;
    };
    
    // 播放语音
    window.speechSynthesis.speak(utterance);
  } else {
    alert('您的浏览器不支持语音合成功能');
  }
}

