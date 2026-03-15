/* Language Switch - Toggle between zh and en content */
(function () {
  'use strict';

  var STORAGE_KEY = 'yujian3d-lang';
  var defaultLang = 'zh';

  var menuTranslations = {
    zh: { '首页': '首页', '归档': '归档', '标签': '标签', '分类': '分类', '友链': '友链', '关于': '关于',
          'Home': '首页', 'Archives': '归档', 'Tags': '标签', 'Categories': '分类', 'Links': '友链', 'About': '关于' },
    en: { '首页': 'Home', '归档': 'Archives', '标签': 'Tags', '分类': 'Categories', '友链': 'Links', '关于': 'About',
          'Home': 'Home', 'Archives': 'Archives', 'Tags': 'Tags', 'Categories': 'Categories', 'Links': 'Links', 'About': 'About' }
  };

  var uiMap = {
    zh: {
      siteTitle: '遇见三维',
      announcement: '欢迎来到遇见三维',
      announcement_title: '公告',
      recentPost: '最新文章',
      categories: '分类', tags: '标签', archives: '归档',
      webinfo: '网站信息',
      articleCount: '文章数目', totalUv: '本站访客数',
      totalPv: '本站总浏览量', lastUpdate: '最后更新时间',
      postSeries: '系列文章',
      authorArticles: '文章', authorTags: '标签',
      authorCategories: '分类', followMe: 'Follow Me',
      searchBtn: ' 搜索', searchTitle: '搜索',
      searchPlaceholder: '搜索文章',
      searchLoading: '  数据加载中',
      subtitle: ['探索三维视觉的前沿技术'],
      postCreated: '发表于', postUpdated: '更新于',
      darkmodeTitle: '日间和夜间模式切换',
      asideTitle: '单栏和双栏切换',
      settingTitle: '设置', goUpTitle: '回到顶部',
      snackDayToNight: '已切换为深色模式',
      snackNightToDay: '已切换为浅色模式',
      copySuccess: '复制成功', copyError: '复制失败',
      loadMore: '加载更多',
      htmlLang: 'zh-CN',
      pageTitles: {
        'Categories': '分类', 'Tags': '标签', 'Links': '友链',
        'about': '关于', 'About': '关于', 'Archives': '归档',
        '分类': '分类', '标签': '标签', '友链': '友链',
        '关于': '关于', '归档': '归档'
      },
      footerFramework: '框架', footerTheme: '主题',
      articleSortTag: '标签', articleSortCategory: '分类',
      pageArticles: '全部文章'
    },
    en: {
      siteTitle: 'Yujian3D',
      announcement: 'Welcome to Yujian3D',
      announcement_title: 'Announcement',
      recentPost: 'Recent Posts',
      categories: 'Categories', tags: 'Tags', archives: 'Archives',
      webinfo: 'Website Info',
      articleCount: 'Article Count', totalUv: 'Unique Visitors',
      totalPv: 'Page Views', lastUpdate: 'Last Update',
      postSeries: 'Post Series',
      authorArticles: 'Articles', authorTags: 'Tags',
      authorCategories: 'Categories', followMe: 'Follow Me',
      searchBtn: ' Search', searchTitle: 'Search',
      searchPlaceholder: 'Search Posts',
      searchLoading: '  Loading Database',
      subtitle: ['Exploring the Frontiers of 3D Vision'],
      postCreated: 'Created', postUpdated: 'Updated',
      darkmodeTitle: 'Toggle Light/Dark Mode',
      asideTitle: 'Toggle Single/Double Column',
      settingTitle: 'Settings', goUpTitle: 'Back to Top',
      snackDayToNight: 'Switched to Dark Mode',
      snackNightToDay: 'Switched to Light Mode',
      copySuccess: 'Copy Successful', copyError: 'Copy Failed',
      loadMore: 'Load More',
      htmlLang: 'en',
      pageTitles: {
        '分类': 'Categories', '标签': 'Tags', '友链': 'Links',
        '关于': 'About', '归档': 'Archives',
        'Categories': 'Categories', 'Tags': 'Tags', 'Links': 'Links',
        'About': 'About', 'Archives': 'Archives',
        'about': 'About'
      },
      footerFramework: 'Framework', footerTheme: 'Theme',
      articleSortTag: 'Tag', articleSortCategory: 'Category',
      pageArticles: 'All Articles'
    }
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || defaultLang;
  }
  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function translateMenuSpans(container, lang) {
    if (!container) return;
    var map = menuTranslations[lang] || menuTranslations.zh;
    container.querySelectorAll('.menus_item > a.site-page > span')
      .forEach(function (span) {
        var text = span.textContent.trim();
        if (map[text]) span.textContent = ' ' + map[text];
      });
  }

  function translateSiteData(container, t) {
    if (!container) return;
    container.querySelectorAll('.site-data a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var h = a.querySelector('.headline');
      if (!h) return;
      if (href.indexOf('/archives') !== -1) h.textContent = t.authorArticles;
      else if (href.indexOf('/tags') !== -1) h.textContent = t.authorTags;
      else if (href.indexOf('/categories') !== -1) h.textContent = t.authorCategories;
    });
  }

  function applyLang(lang) {
    var t = uiMap[lang] || uiMap.zh;

    // 1. Browser tab title & html lang
    document.documentElement.setAttribute('lang', t.htmlLang);
    var pageTitle = document.title;
    // Translate site name in title
    if (lang === 'en') {
      pageTitle = pageTitle.replace('遇见三维', 'Yujian3D');
    } else {
      pageTitle = pageTitle.replace('Yujian3D', '遇见三维');
    }
    // Translate page-specific parts of the title
    if (t.pageTitles) {
      Object.keys(t.pageTitles).forEach(function (key) {
        if (pageTitle.indexOf(key) !== -1 && key !== t.pageTitles[key]) {
          pageTitle = pageTitle.replace(key, t.pageTitles[key]);
        }
      });
    }
    document.title = pageTitle;

    // 2. Content blocks
    document.querySelectorAll('.lang-zh').forEach(function (el) {
      el.style.display = lang === 'zh' ? '' : 'none';
    });
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.style.display = lang === 'en' ? '' : 'none';
    });

    // 3. Nav site title (class="site-name")
    document.querySelectorAll('.site-name').forEach(function (el) {
      el.textContent = t.siteTitle;
    });

    // 4. Hero banner title
    var heroTitle = document.getElementById('site-title');
    if (heroTitle) {
      // On home page, show site title; on other pages, translate page title
      var pageInfo = document.getElementById('page-site-info');
      if (pageInfo) {
        var text = heroTitle.textContent.trim();
        if (t.pageTitles && t.pageTitles[text]) {
          heroTitle.textContent = t.pageTitles[text];
        }
      } else {
        heroTitle.textContent = t.siteTitle;
      }
    }

    // 4b. Page title (when top_img is false)
    document.querySelectorAll('.page-title').forEach(function (el) {
      var text = el.textContent.trim();
      if (t.pageTitles && t.pageTitles[text]) {
        el.textContent = t.pageTitles[text];
      }
    });

    // 4c. SEO title
    document.querySelectorAll('.title-seo').forEach(function (el) {
      var text = el.textContent.trim();
      if (t.pageTitles && t.pageTitles[text]) {
        el.textContent = t.pageTitles[text];
      }
    });

    // 5. Subtitle (typed.js)
    if (window.typed && typeof window.typed.destroy === 'function') {
      window.typed.destroy();
    }
    var subtitleEl = document.getElementById('subtitle');
    if (subtitleEl && window.typedJSFn) {
      subtitleEl.textContent = '';
      window.typedJSFn.init(t.subtitle);
    }

    // 6. Search button in nav bar
    var searchBtnSpan = document.querySelector('#search-button .search span');
    if (searchBtnSpan) searchBtnSpan.textContent = t.searchBtn;

    // 7. Nav menus (desktop)
    translateMenuSpans(document.getElementById('menus'), lang);

    // 8. Sidebar menus (mobile)
    translateMenuSpans(document.getElementById('sidebar-menus'), lang);
    translateSiteData(document.getElementById('sidebar-menus'), t);

    // 9. Search dialog
    var searchTitle = document.querySelector('.search-dialog-title');
    if (searchTitle) searchTitle.textContent = t.searchTitle;
    var searchInput = document.querySelector('.local-search-input input');
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    var loadingDb = document.querySelector('#loading-database span');
    if (loadingDb) loadingDb.textContent = t.searchLoading;

    // 10. Aside card headlines
    var cardMap = {
      'card-announcement': t.announcement_title,
      'card-recent-post': t.recentPost,
      'card-categories': t.categories,
      'card-tags': t.tags,
      'card-archives': t.archives,
      'card-webinfo': t.webinfo,
      'card-post-series': t.postSeries
    };
    Object.keys(cardMap).forEach(function (cls) {
      var card = document.querySelector('.card-widget.' + cls);
      if (!card) return;
      var span = card.querySelector('.item-headline span');
      if (span) span.textContent = cardMap[cls];
    });

    // 11. Announcement content
    document.querySelectorAll('.announcement_content').forEach(function (el) {
      el.textContent = t.announcement;
    });

    // 12. Webinfo details
    document.querySelectorAll('.webinfo .webinfo-item .item-name')
      .forEach(function (el) {
        var text = el.textContent.replace(/\s*:\s*$/, '').trim();
        if (text === '文章数目' || text === 'Article Count')
          el.textContent = t.articleCount + ' :';
        else if (text === '本站访客数' || text === 'Unique Visitors')
          el.textContent = t.totalUv + ' :';
        else if (text === '本站总浏览量' || text === 'Page Views')
          el.textContent = t.totalPv + ' :';
        else if (text === '最后更新时间' || text === 'Last Update')
          el.textContent = t.lastUpdate + ' :';
      });

    // 13. Author card site-data (desktop aside)
    translateSiteData(document.getElementById('aside-content'), t);

    // 14. Post meta labels
    document.querySelectorAll('.post-meta-label').forEach(function (el) {
      var text = el.textContent.trim();
      if (text === '发表于' || text === 'Created')
        el.textContent = t.postCreated;
      else if (text === '更新于' || text === 'Updated')
        el.textContent = t.postUpdated;
    });
    // Also article-meta-label on index page
    document.querySelectorAll('.article-meta-label').forEach(function (el) {
      var text = el.textContent.trim();
      if (text === '发表于' || text === 'Created')
        el.textContent = t.postCreated;
      else if (text === '更新于' || text === 'Updated')
        el.textContent = t.postUpdated;
    });

    // 15. Rightside buttons
    var dm = document.getElementById('darkmode');
    if (dm) dm.title = t.darkmodeTitle;
    var ha = document.getElementById('hide-aside-btn');
    if (ha) ha.title = t.asideTitle;
    var rc = document.getElementById('rightside-config');
    if (rc) rc.title = t.settingTitle;
    var gu = document.getElementById('go-up');
    if (gu) gu.title = t.goUpTitle;

    // 16. Snackbar & copy messages in GLOBAL_CONFIG
    if (window.GLOBAL_CONFIG) {
      if (GLOBAL_CONFIG.Snackbar) {
        GLOBAL_CONFIG.Snackbar.day_to_night = t.snackDayToNight;
        GLOBAL_CONFIG.Snackbar.night_to_day = t.snackNightToDay;
      }
      if (GLOBAL_CONFIG.copy) {
        GLOBAL_CONFIG.copy.success = t.copySuccess;
        GLOBAL_CONFIG.copy.error = t.copyError;
      }
      if (GLOBAL_CONFIG.infinitegrid) {
        GLOBAL_CONFIG.infinitegrid.buttonText = t.loadMore;
      }
    }

    // 17. Footer text
    document.querySelectorAll('.framework-info > span').forEach(function (el) {
      var text = el.textContent.trim();
      if (text === '框架' || text === 'Framework') el.textContent = t.footerFramework + ' ';
      else if (text === '主题' || text === 'Theme') el.textContent = t.footerTheme + ' ';
    });

    // 18. Article sort title on tag/category pages
    document.querySelectorAll('.article-sort-title').forEach(function (el) {
      var text = el.textContent.trim();
      var match = text.match(/^(.+?)\s*-\s*(.+)$/);
      if (match) {
        var prefix = match[1].trim();
        var name = match[2].trim();
        if (prefix === '标签' || prefix === 'Tag') {
          el.textContent = t.articleSortTag + ' - ' + name;
        } else if (prefix === '分类' || prefix === 'Category') {
          el.textContent = t.articleSortCategory + ' - ' + name;
        }
      }
    });

    // 19. Page articles title (archives page)
    document.querySelectorAll('#archive .article-sort-title').forEach(function (el) {
      var text = el.textContent.trim();
      var match = text.match(/^(.+?)\s*-\s*(\d+)$/);
      if (match) {
        var label = match[1].trim();
        var count = match[2];
        if (label === '全部文章' || label === 'All Articles') {
          el.textContent = t.pageArticles + ' - ' + count;
        }
      }
      if (text === '全部文章' || text === 'All Articles') {
        el.textContent = t.pageArticles;
      }
    });

    // 20. Lang switch buttons — show current language state
    var btns = [
      document.getElementById('lang-switch-btn'),
      document.getElementById('lang-switch-btn-mobile')
    ];
    btns.forEach(function (btn) {
      if (!btn) return;
      var span = btn.querySelector('span');
      if (span) span.textContent = lang === 'zh' ? ' 中文' : ' EN';
      btn.title = lang === 'zh'
        ? '当前：中文 / Click to switch to English'
        : 'Current: English / 点击切换到中文';
    });
  }

  function toggle() {
    var lang = getLang() === 'zh' ? 'en' : 'zh';
    setLang(lang);
    applyLang(lang);
  }

  function injectButton() {
    var lang = getLang();
    var label = lang === 'zh' ? ' 中文' : ' EN';
    var title = lang === 'zh'
      ? '当前：中文 / Click to switch to English'
      : 'Current: English / 点击切换到中文';

    // Desktop nav button
    if (!document.getElementById('lang-switch-btn')) {
      var nav = document.querySelector('#menus .menus_items');
      if (nav) {
        var wrapper = document.createElement('div');
        wrapper.className = 'menus_item';
        var btn = document.createElement('a');
        btn.id = 'lang-switch-btn';
        btn.className = 'site-page';
        btn.href = 'javascript:void(0);';
        btn.title = title;
        btn.innerHTML = '<i class="fas fa-globe fa-fw"></i><span>' + label + '</span>';
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          toggle();
        });
        wrapper.appendChild(btn);
        nav.appendChild(wrapper);
      }
    }

    // Mobile sidebar button
    if (!document.getElementById('lang-switch-btn-mobile')) {
      var sidebar = document.querySelector('#sidebar-menus .menus_items');
      if (sidebar) {
        var wrapper2 = document.createElement('div');
        wrapper2.className = 'menus_item';
        var btn2 = document.createElement('a');
        btn2.id = 'lang-switch-btn-mobile';
        btn2.className = 'site-page';
        btn2.href = 'javascript:void(0);';
        btn2.title = title;
        btn2.innerHTML = '<i class="fas fa-globe fa-fw"></i><span>' + label + '</span>';
        btn2.addEventListener('click', function (e) {
          e.preventDefault();
          toggle();
        });
        wrapper2.appendChild(btn2);
        sidebar.appendChild(wrapper2);
      }
    }
  }

  function init() {
    injectButton();
    applyLang(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('pjax:complete', init);
})();
