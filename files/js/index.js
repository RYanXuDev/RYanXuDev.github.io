const SIDEBAR = document.getElementById('sidebar');
const HOME_CONTENT_CONTAINER = document.getElementById('home-content-container');
const GAMES_CONTENT_CONTAINER = document.getElementById('games-content-container');
const TUTORIALS_CONTENT_CONTAINER = document.getElementById('tutorials-content-container');
const BLOGS_CONTENT_CONTAINER = document.getElementById('blogs-content-container');
const CONTACT_CONTENT_CONTAINER = document.getElementById('contact-content-container');

let tutorialArticleContainer;
let tutorialListContainer;
let blogArticleContainer;
let blogListContainer;

initializeContent();
initializeTheme();
initializeSidebarStyle();
initializeSidebarToggle();
initializeDisplayModeToggle();
initializeNaviButtons();
initializeIconLinks();
SetCurrentYear();

function initializeContent() {
    let homeHTML;
    let gamesHTML;
    let tutorialsHTML;
    let blogsHTML;
    let contactHTML;

    Promise.all([
        getHtmlContent('files/html/home.html'),
        getHtmlContent('files/html/games.html'),
        getHtmlContent('files/html/tutorials.html'),
        getHtmlContent('files/html/blogs.html'),
        getHtmlContent('files/html/contact.html')])
        .then(contents => {
            [homeHTML, gamesHTML, tutorialsHTML, blogsHTML, contactHTML] = contents;

            loadContent(HOME_CONTENT_CONTAINER, homeHTML);
            loadContent(GAMES_CONTENT_CONTAINER, gamesHTML);
            loadContent(TUTORIALS_CONTENT_CONTAINER, tutorialsHTML);
            loadContent(BLOGS_CONTENT_CONTAINER, blogsHTML);
            loadContent(CONTACT_CONTENT_CONTAINER, contactHTML);

            initializeGameWindow();

            HOME_CONTENT_CONTAINER.style.display = "flex";

            tutorialListContainer = document.getElementById('tutorial-list-container');
            tutorialArticleContainer = document.getElementById('tutorial-article-container');
            tutorialArticleContainer.style.display = 'none';

            blogListContainer = document.getElementById('blog-list-container');
            blogArticleContainer = document.getElementById('blog-article-container');
            blogArticleContainer.style.display = 'none';
            
            initializeTutorials();
            initializeBlogs();

        })
        .catch(error => {
            console.error('Error initializing content:', error);
        });

    function getHtmlContent(path) {
        return fetch(path)
            .then(response => response.text())
            .then(htmlContent => {
                return htmlContent;
            });
    }

    function loadContent(contentContainer, html) {
        const content = document.createElement('div');
        content.innerHTML = html;
        content.style.flex = "1";
        contentContainer.appendChild(content);
        contentContainer.style.display = "none";
    }

    function initializeGameWindow() {
        const gameList = document.getElementById("game-list");
        const gameWindow = document.getElementById('game-window');
        const gameWindowCloseButton = document.getElementById('game-window-close-button');
        const gameFrame = document.getElementById('game-frame');

        gameWindowCloseButton.addEventListener("click", function () {
            unloadGame();
            gameWindow.style.display = "none";
            gameList.style.display = "flex";
        });

        gameList.querySelectorAll('.game-panel').forEach(gamePanel => {
            gamePanel.addEventListener("click", function () {
                gameWindow.style.display = "flex";
                gameList.style.display = "none";

                switch (gamePanel.id) {
                    case 'game-panel-shooting-star':
                        loadGame("https://itch.io/embed-upload/10078260?color=ffffff");
                        break;
                    case 'game-panel-02':
                        break;
                    case 'game-panel-03':
                        break;
                    default:
                        break;
                }
            })
        })

        function loadGame(path) {
            unloadGame();
            gameFrame.src = path;
            gameFrame.setAttribute('allowfullscreen', '');
            gameWindow.appendChild(gameFrame);
        }

        function unloadGame() {
            const iframe = gameWindow.querySelector('iframe');

            if (iframe) {
                gameWindow.removeChild(iframe);
            }
        }
    }
}

function initializeTheme() {
    let currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 18) {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }

    let savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function initializeSidebarStyle() {
    let savedSidebarStyle = localStorage.getItem('sidebar-style');

    if (savedSidebarStyle === 'closed') {
        SIDEBAR.classList.add('closed');
    } else {
        SIDEBAR.classList.remove('closed');
    }
}

function initializeSidebarToggle() {
    const SIDEBAR_TOGGLE = document.getElementById('sidebar-toggle');
    SIDEBAR_TOGGLE.addEventListener('click', () => {
        SIDEBAR.classList.toggle('closed');

        if (SIDEBAR.classList.contains('closed')) {
            localStorage.setItem('sidebar-style', 'closed');
        } else {
            localStorage.setItem('sidebar-style', 'open');
        }
    });

    const SEARCH_BOX = document.getElementById('sidebar-search-box');
    SEARCH_BOX.addEventListener('click', () => {
        SIDEBAR.classList.remove('closed');

        if (SIDEBAR.classList.contains('closed')) {
            localStorage.setItem('sidebar-style', 'closed');
        } else {
            localStorage.setItem('sidebar-style', 'open');
        }
    });
}

function initializeDisplayModeToggle() {
    const DISPLAY_MODE_TOGGLE = document.getElementById('display-mode-toggle');
    DISPLAY_MODE_TOGGLE.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    })
}

function initializeIconLinks() {
    document.querySelectorAll('.icon-link').forEach(function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            window.open(event.currentTarget.getAttribute('data-url'), '_blank');
        })
    });
}

function SetCurrentYear() {
    const PROJECT_START_YEAR = 2024;
    const CURRENT_YEAR = new Date().getFullYear();
    const CURRENT_YEAR_TEXT = document.getElementById('current-year');
    CURRENT_YEAR_TEXT.textContent = CURRENT_YEAR === PROJECT_START_YEAR ? CURRENT_YEAR.toString() : `${PROJECT_START_YEAR} - ${CURRENT_YEAR}`;
}

function sidebarSearch() {

}

function initializeNaviButtons() {
    let focusedNaviButton = document.getElementById("navi-home");
    let shownContentContainer = HOME_CONTENT_CONTAINER;
    const naviButtons = document.querySelectorAll('.navi-button');
    const naviMap = new Map();

    naviMap.set('navi-home', HOME_CONTENT_CONTAINER);
    naviMap.set('navi-games', GAMES_CONTENT_CONTAINER);
    naviMap.set('navi-tutorials', TUTORIALS_CONTENT_CONTAINER);
    naviMap.set('navi-blogs', BLOGS_CONTENT_CONTAINER);
    naviMap.set('navi-contact', CONTACT_CONTENT_CONTAINER);

    naviButtons.forEach(naviButton => {
        naviButton.addEventListener('click', () => {
            if (focusedNaviButton.id === naviButton.id) return;

            focusedNaviButton.classList.remove('navi-button-focused');
            focusedNaviButton.querySelectorAll('span').forEach(element => {
                element.classList.remove('focused');
            })
            focusedNaviButton = naviButton;

            naviButton.classList.add('navi-button-focused');
            naviButton.querySelectorAll('span').forEach(element => {
                element.classList.add('focused');
            })

            shownContentContainer.style.display = "none";
            shownContentContainer = naviMap.get(naviButton.id);
            shownContentContainer.style.display = "flex";
        });
    });

    document.getElementById("navi-home").classList.add('navi-button-focused');
    document.getElementById("navi-home").querySelectorAll('span').forEach(element => {
        element.classList.add('focused');
    })
}

function fetchAllFilesInDirectory(directoryPath) {
    function parseFileName(fileName) {
        // 定义正则表达式来匹配文件名格式
        const regex = /^(.+)\.(\d{4}-\d{2}-\d{2})\.(\d{2})\.(\w+)$/;
        // 使用正则表达式来匹配文件名
        const match = fileName.match(regex);

        // 如果文件名匹配成功
        if (match) {
            // 提取文件名的各个部分
            const realName = match[1]; // 文件的真实名字
            const updateDate = match[2]; // 文件的更新日期
            const index = match[3]; // 文件的序号
            const extension = match[4]; // 文件的拓展名

            // 返回提取的信息
            return {
                realName: realName,
                updateDate: updateDate,
                index: index,
                extension: extension
            };
        } else {
            // 如果文件名格式不匹配，返回空对象或者抛出错误，视情况而定
            console.log(`%cFile [${fileName}] naming format not match...`, 'color: red;');
            return {};
        }
    }

    const apiURL = "https://api.github.com/repos/RYanXuDev/RYanXuDev.github.io/contents/" + directoryPath;
    return fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const files = data.filter(item => item.type === 'file');
            const directories = data.filter(item => item.type === 'dir');
            const filePromises = files.map(file => {
                const fileInfo = parseFileName(file.name);
                if (fileInfo === {}) return;
                return fetch(file.download_url)
                    .then(response => response.text())
                    .then(content => ({
                        path: file.path,
                        name: fileInfo.realName,
                        updateDate: fileInfo.updateDate,
                        index: fileInfo.index,
                        extension: fileInfo.extension,
                        content: content
                    }));
            });
            const directoryPromises = directories.map(dir => fetchAllFilesInDirectory(directoryPath + '/' + dir.name));

            return Promise.all([...filePromises, ...directoryPromises]);
        })
        .then(files => files.flat());
}

function initializeBlogs() {
    const blogsDirectoryPath = 'blogs';
    generateArticleList(blogsDirectoryPath, blogListContainer, blogArticleContainer);

    const blogContentCloseButton = document.getElementById('blog-content-close-button');
    blogContentCloseButton.addEventListener('click', function () {
        blogArticleContainer.style.display = "none";
        blogListContainer.style.display = "flex";
    });
}

function initializeTutorials(){
    const tutorialDirectoryPath = 'tutorials';
    generateArticleList(tutorialDirectoryPath, tutorialListContainer, tutorialArticleContainer);
    
    const tutorialContentCloseButton = document.getElementById('tutorial-content-close-button');
    tutorialContentCloseButton.addEventListener('click', function (){
        tutorialArticleContainer.style.display = "none";
        tutorialListContainer.style.display = "flex";
    });
}

function generateArticleList(directoryPath, listContainer, articleContainer) {
    const articleList = listContainer.querySelector('.article-list');
    const articleContentContainer = articleContainer.querySelector('.article-content-container');

    fetchAllFilesInDirectory(directoryPath).then(files => {
        const sortedFiles = sortByUpdateDateAndIndex(files);

        sortedFiles.forEach(file => {
            const article = document.createElement('li');
            const articleIcon = document.createElement('i');
            const articleLink = document.createElement('a');
            const articleUpdateDate = document.createElement('span');

            articleIcon.classList.add('fa-solid');
            
            articleLink.textContent = file.name;
            articleLink.href = `#${file.path}`;
            articleLink.addEventListener('click', () => {
                listContainer.style.display = 'none';
                articleContainer.style.display = 'flex';

                switch (file.extension) {
                    case 'md':
                        convertMarkDown(articleContentContainer, file.content);
                        break;
                    case 'html':
                        articleContentContainer.innerHTML = file.content;
                        break;
                    default:
                        break;
                }
            });

            articleUpdateDate.textContent = file.updateDate;
            
            article.appendChild(articleIcon);
            article.appendChild(articleLink);
            article.appendChild(articleUpdateDate);
            articleList.appendChild(article);
        });

        function convertMarkDown(contentContainer, markdownContent) {
            const converter = new showdown.Converter();
            contentContainer.innerHTML = converter.makeHtml(markdownContent);
        }
    })
}

function sortByUpdateDateAndIndex(files) {
    files.sort((a, b) => {
        const aUpdateDate = new Date(a.updateDate);
        const bUpdateDate = new Date(b.updateDate);

        if (aUpdateDate > bUpdateDate) return -1;
        if (aUpdateDate < bUpdateDate) return 1;

        return parseInt(b.index) - parseInt(a.index);
    });

    return files;
}

// // Test
// fetchAllFilesInDirectory('blogs').then(files =>
// {
//     console.log("原来的文件名列表：");
//     files.forEach(file =>
//     {
//         console.log(file.name);
//     })
//
//     const sortedFiles = sortByUpdateDateAndIndex(files);
//     console.log("排序后的文件名列表：");
//     sortedFiles.forEach(file =>
//     {
//         console.log(`%c${file.name}`, 'color: red;');
//     })
// })