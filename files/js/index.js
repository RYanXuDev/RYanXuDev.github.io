const SIDEBAR = document.getElementById('sidebar');
const HOME_CONTENT_CONTAINER = document.getElementById('home-content-container');
const GAMES_CONTENT_CONTAINER = document.getElementById('games-content-container');
const TUTORIALS_CONTENT_CONTAINER = document.getElementById('tutorials-content-container');
const BLOGS_CONTENT_CONTAINER = document.getElementById('blogs-content-container');
const CONTACT_CONTENT_CONTAINER = document.getElementById('contact-content-container');

let tutorialArticleContainer;

initializeContent();
initializeTheme();
initializeSidebarStyle();
initializeSidebarToggle();
initializeDisplayModeToggle();
initializeNaviButtons();
initializeIconLinks();
SetCurrentYear();

function initializeContent()
{
    let homeHTML;
    let gamesHTML;
    let tutorialsHTML;
    let blogsHTML;
    let contactHTML;

    Promise.all([
        getHtmlContent('files/html/home.html'),
        getHtmlContent('files/html/games.html'),
        getHtmlContent('files/html/tutorials.html'),
        getHtmlContent('files/html/blogList.html'),
        getHtmlContent('files/html/contact.html')])
        .then(contents =>
        {
            [homeHTML, gamesHTML, tutorialsHTML, blogsHTML, contactHTML] = contents;

            loadContent(HOME_CONTENT_CONTAINER, homeHTML);
            loadContent(GAMES_CONTENT_CONTAINER, gamesHTML);
            loadContent(TUTORIALS_CONTENT_CONTAINER, tutorialsHTML);
            loadContent(BLOGS_CONTENT_CONTAINER, blogsHTML);
            loadContent(CONTACT_CONTENT_CONTAINER, contactHTML);

            initializeGameWindow();

            HOME_CONTENT_CONTAINER.style.display = "flex";

            tutorialArticleContainer = document.getElementById('tutorial-article-container');
            testTutorialContainer();

        })
        .catch(error =>
        {
            console.error('Error initializing content:', error);
        });

    function getHtmlContent(path)
    {
        return fetch(path)
            .then(response => response.text())
            .then(htmlContent =>
            {
                return htmlContent;
            });
    }

    function loadContent(contentContainer, html)
    {
        const content = document.createElement('div');
        content.innerHTML = html;
        content.style.flex = "1";
        contentContainer.appendChild(content);
        contentContainer.style.display = "none";
    }

    function initializeGameWindow()
    {
        const gameList = document.getElementById("game-list");
        const gameWindow = document.getElementById('game-window');
        const gameWindowCloseButton = document.getElementById('game-window-close-button');
        const gameFrame = document.getElementById('game-frame');

        gameWindowCloseButton.addEventListener("click", function ()
        {
            unloadGame();
            gameWindow.style.display = "none";
            gameList.style.display = "flex";
        });

        gameList.querySelectorAll('.game-panel').forEach(gamePanel =>
        {
            gamePanel.addEventListener("click", function ()
            {
                gameWindow.style.display = "flex";
                gameList.style.display = "none";

                switch (gamePanel.id)
                {
                    case 'game-panel-shooting-star':
                        loadGame("https://itch.io/embed-upload/10046807?color=ffffff");
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

        function loadGame(path)
        {
            unloadGame();
            gameFrame.src = path;
            gameFrame.setAttribute('allowfullscreen', '');
            gameWindow.appendChild(gameFrame);
        }

        function  unloadGame()
        {
            const iframe = gameWindow.querySelector('iframe');

            if (iframe)
            {
                gameWindow.removeChild(iframe);
            }
        }
    }
}

function initializeTheme()
{
    let currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 18)
    {
        document.body.classList.remove('dark-mode');
    }
    else
    {
        document.body.classList.add('dark-mode');
    }

    let savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark')
    {
        document.body.classList.add('dark-mode');
    }
    else
    {
        document.body.classList.remove('dark-mode');
    }
}

function initializeSidebarStyle()
{
    let savedSidebarStyle = localStorage.getItem('sidebar-style');

    if (savedSidebarStyle === 'closed') 
    {
        SIDEBAR.classList.add('closed');
    } 
    else 
    {
        SIDEBAR.classList.remove('closed');
    }
}

function initializeSidebarToggle()
{
    const SIDEBAR_TOGGLE = document.getElementById('sidebar-toggle');
    SIDEBAR_TOGGLE.addEventListener('click', () =>
    {
        SIDEBAR.classList.toggle('closed');

        if (SIDEBAR.classList.contains('closed'))
        {
            localStorage.setItem('sidebar-style', 'closed');
        }
        else
        {
            localStorage.setItem('sidebar-style', 'open');
        }
    });
    
    const SEARCH_BOX = document.getElementById('sidebar-search-box');
    SEARCH_BOX.addEventListener('click', () =>
    {
        SIDEBAR.classList.remove('closed');
    
        if (SIDEBAR.classList.contains('closed'))
        {
            localStorage.setItem('sidebar-style', 'closed');
        }
        else
        {
            localStorage.setItem('sidebar-style', 'open');
        }
    });
}

function initializeDisplayModeToggle()
{
    const DISPLAY_MODE_TOGGLE = document.getElementById('display-mode-toggle');
    DISPLAY_MODE_TOGGLE.addEventListener('click', () =>
    {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode'))
        {
            localStorage.setItem('theme', 'dark');
        }
        else
        {
            localStorage.setItem('theme', 'light');
        }
    })
}

function initializeIconLinks()
{
    document.querySelectorAll('.icon-link').forEach(function (element)
    {
        element.addEventListener('click', function (event)
        {
            event.preventDefault();
            window.open(event.currentTarget.getAttribute('data-url'), '_blank');
        }) 
    });
}

function SetCurrentYear()
{
    const PROJECT_START_YEAR = 2024;
    const CURRENT_YEAR = new Date().getFullYear();
    const CURRENT_YEAR_TEXT = document.getElementById('current-year');
    CURRENT_YEAR_TEXT.textContent = CURRENT_YEAR === PROJECT_START_YEAR ? CURRENT_YEAR.toString() : `${PROJECT_START_YEAR} - ${CURRENT_YEAR}`;
}

function sidebarSearch()
{

}

function initializeNaviButtons()
{
    let focusedNaviButton = document.getElementById("navi-home");
    let shownContentContainer = HOME_CONTENT_CONTAINER;
    const naviButtons = document.querySelectorAll('.navi-button');
    const naviMap = new Map();
    
    naviMap.set('navi-home', HOME_CONTENT_CONTAINER);
    naviMap.set('navi-games', GAMES_CONTENT_CONTAINER);
    naviMap.set('navi-tutorials', TUTORIALS_CONTENT_CONTAINER);
    naviMap.set('navi-blogs', BLOGS_CONTENT_CONTAINER);
    naviMap.set('navi-contact', CONTACT_CONTENT_CONTAINER);

    naviButtons.forEach(naviButton =>
    {
        naviButton.addEventListener('click', () =>
        {
            if (focusedNaviButton.id === naviButton.id) return;

            focusedNaviButton.classList.remove('navi-button-focused');
            focusedNaviButton.querySelectorAll('span').forEach(element =>
            {
                element.classList.remove('focused');
            })
            focusedNaviButton = naviButton;

            naviButton.classList.add('navi-button-focused');
            naviButton.querySelectorAll('span').forEach(element =>
            {
                element.classList.add('focused');
            })
            
            shownContentContainer.style.display = "none";
            shownContentContainer = naviMap.get(naviButton.id);
            shownContentContainer.style.display = "flex";
        });
    });

    document.getElementById("navi-home").classList.add('navi-button-focused');
    document.getElementById("navi-home").querySelectorAll('span').forEach(element =>
    {
        element.classList.add('focused');
    })
}

function convertMarkDown(contentContainer, path)
{
    const converter = new showdown.Converter();

    fetch(path)
        .then(response => response.text())
        .then(markdownText => 
        {
            contentContainer.innerHTML = converter.makeHtml(markdownText);
        })
        .catch(error => 
        {
            console.error('Error fetching Markdown file:', error);
        });
}

function testTutorialContainer()
{
    convertMarkDown(tutorialArticleContainer, "files/md/GameDevLogs/shooting-star/shooting-star-update-v0.3.1.md");
}

function getMarkdownArticles(directoryPath) 
{
    const markdownFilesMap = new Map();
    return fetchDirectoryContents(directoryPath)
        .then(files => 
        {
            files.forEach(file => 
            {
                const fileName = extractFileName(file.path);
                
                if (fileName.endsWith('.md')) 
                {
                    const articleName = removeExtension(fileName);
                    markdownFilesMap.set(articleName, file.path);
                }
            });
            
            return markdownFilesMap;
        });
    
    function fetchDirectoryContents(directoryPath)
    {
        const apiURL = "https://api.github.com/repos/RYanXuDev/RYanXuDev.github.io/contents/" + directoryPath;
        return fetch(apiURL)
            .then(response => response.json())
            .then(data => data.filter(item => item.type === 'file'));
    }
    
    function extractFileName(filePath) 
    {
        return filePath.split('/').pop();
    }
    
    function removeExtension(fileName) 
    {
        return fileName.split('.').slice(0, -1).join('.');
    }
}

const directoryPath = 'files/md';
getMarkdownArticles(directoryPath)
    .then(markdownFilesMap => 
    {
        markdownFilesMap.forEach((path, name) => 
        {
            console.log(`Article Name: ${name}, Path: ${path}`);
        });
    })
    .catch(error => 
    {
        console.error('Error fetching Markdown files:', error);
    });