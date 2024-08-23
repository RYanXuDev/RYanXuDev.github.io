const sideBar = document.getElementById('sidebar');
const homeContentContainer = document.getElementById('home-content-container');
const gamesContentContainer = document.getElementById('games-content-container');
const tutorialsContentContainer = document.getElementById('tutorials-content-container');
const blogsContentContainer = document.getElementById('blogs-content-container');
const contactContentContainer = document.getElementById('contact-content-container');
const backToTopButtonShowThreshold = 100;
const naviMap = new Map();

let focusedNaviButton = document.getElementById("home");
let shownContentContainer = homeContentContainer;
let hashID;

import { updateUrlByID } from "./utility.js";
import { getKeyByValue } from "./utility.js";
import { fetchAllFilesInDirectory } from "./file.js";

onDOMContentLoaded();
initializeMaps();
initializeContent();
initializeTheme();
initializeSidebarStyle();
initializeSidebarToggle();
initializeDisplayModeToggle();
initializeIconLinks();
initializeCopyrightInfo();

function onDOMContentLoaded()
{
    window.addEventListener('DOMContentLoaded', function () {
        if (!window.location.hash) return;

        hashID = window.location.hash.substring(1);
    })
}

function initializeMaps()
{
    naviMap.set('home', homeContentContainer);
    naviMap.set('games', gamesContentContainer);
    naviMap.set('tutorials', tutorialsContentContainer);
    naviMap.set('blogs', blogsContentContainer);
    naviMap.set('contact', contactContentContainer);
}

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
        getHtmlContent('files/html/contact.html')]).then(contents => {
            [homeHTML, gamesHTML, tutorialsHTML, blogsHTML, contactHTML] = contents;
            
            loadContent(homeContentContainer, homeHTML);
            loadContent(gamesContentContainer, gamesHTML);
            loadContent(tutorialsContentContainer, tutorialsHTML);
            loadContent(blogsContentContainer, blogsHTML);
            loadContent(contactContentContainer, contactHTML);
            
            homeContentContainer.style.display = "flex";
            
            initializeGameWindow();
            initializeTutorials();
            initializeBlogs();
            initializeNaviButtons();
            
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
            updateUrlByID("games");
            
            gameWindow.style.display = "none";
            gameList.style.display = "flex";
            
            window.removeEventListener('wheel', disableScroll);
        });

        gameList.querySelectorAll('.game-panel').forEach(gamePanel => {
            gamePanel.addEventListener("click", function () {
                updateUrlByID(gamePanel.id);
                showGameWindow(gamePanel.id);
            });
            
            if (hashID && hashID === gamePanel.id)
            {
                showGameWindow(hashID);
                const gamesNaviButton = document.getElementById("games");
                ShowNaviContent(gamesNaviButton);
                highlightNaviButton(gamesNaviButton);
            }
        });
        
        function showGameWindow(gamePanelID)
        {
            gameWindow.style.display = "flex";
            gameList.style.display = "none";
            
            window.addEventListener('wheel', disableScroll, { passive: false });

            switch (gamePanelID) {
                case 'game-shooting-star':
                    loadGame("https://itch.io/embed-upload/10078260?color=ffffff");
                    break;
                case 'game-dragon-crashers-jrpg':
                    loadGame("https://itch.io/embed-upload/11290603?color=ffffff")
                    // resizeGameFrame(1600, 900);
                    break;
                case 'game--03':
                    break;
                default:
                    break;
            }
        }
        
        function disableScroll(event)
        {
            event.preventDefault();
        }

        function loadGame(path) {
            unloadGame();
            gameFrame.src = path;
            gameFrame.setAttribute('allowfullscreen', 'true');
            gameWindow.appendChild(gameFrame);
        }

        function unloadGame() {
            const iframe = gameWindow.querySelector('iframe');

            if (iframe) {
                gameWindow.removeChild(iframe);
            }
        }
        
        function resizeGameFrame(gameWidth, gameHeight)
        {
            const frameWidth = gameFrame.clientWidth;
            const frameHeight = gameFrame.clientHeight;
            const scaleWidth = frameWidth / gameWidth;
            const scaleHeight = frameHeight / gameHeight;
            const scale = Math.min(scaleWidth, scaleHeight);
            
            gameFrame.style.transform = `scale(${scale})`;
            gameFrame.style.transformOrigin = '0.5 0.5';
        }
    }

    function initializeTutorials(){
        const tutorialDirectoryPath = 'tutorials';
        const tutorialListContainer = document.getElementById('tutorial-list-container');
        const tutorialArticleContainer = document.getElementById('tutorial-article-container');

        tutorialListContainer.style.display = "flex";
        tutorialArticleContainer.style.display = 'none';
        generateArticleList(tutorialDirectoryPath, tutorialListContainer, tutorialArticleContainer);

        const tutorialContentCloseButton = document.getElementById('tutorial-content-close-button');
        tutorialContentCloseButton.addEventListener('click', function () {
            tutorialArticleContainer.style.display = "none";
            tutorialListContainer.style.display = "flex";
            updateUrlByID("tutorials");
        });
            
        const articleContentContainer = tutorialArticleContainer.querySelector('.article-content-container');
        const tutorialBackToTopButton = document.getElementById('tutorial-back-to-top-button');

        articleContentContainer.addEventListener('scroll', function () {
            if (articleContentContainer.scrollTop > backToTopButtonShowThreshold) {
                tutorialBackToTopButton.style.display = "block";
            } else {
                tutorialBackToTopButton.style.display = "none";
            }
        });
        
        tutorialBackToTopButton.style.display = "none";
        tutorialBackToTopButton.addEventListener('click', function () {
            articleContentContainer.scrollTop = 0;
        });
    }

    function initializeBlogs() {
        const blogsDirectoryPath = 'blogs';
        const blogListContainer = document.getElementById('blog-list-container');
        const blogArticleContainer = document.getElementById('blog-article-container');

        blogListContainer.style.display = "flex";
        blogArticleContainer.style.display = 'none';
        generateArticleList(blogsDirectoryPath, blogListContainer, blogArticleContainer);

        const blogContentCloseButton = document.getElementById('blog-content-close-button');
        blogContentCloseButton.addEventListener('click', function () {
            blogArticleContainer.style.display = "none";
            blogListContainer.style.display = "flex";
            updateUrlByID("blogs");
        });
        
        const articleContentContainer = blogArticleContainer.querySelector('.article-content-container');
        const blogBackToTopButton = document.getElementById('blog-back-to-top-button');
        
        articleContentContainer.addEventListener('scroll', function () {
            if (articleContentContainer.scrollTop > backToTopButtonShowThreshold) {
                blogBackToTopButton.style.display = "block";
            } else {
                blogBackToTopButton.style.display = "none";
            }
        });
        
        blogBackToTopButton.style.display = "none";
        blogBackToTopButton.addEventListener('click', function () {
            articleContentContainer.scrollTop = 0;
        });
    }
    
    function initializeNaviButtons() {
        const naviButtons = document.querySelectorAll('.navi-button');

        naviButtons.forEach(naviButton => {
            naviButton.addEventListener('click', () => {
                if (focusedNaviButton.id === naviButton.id)
                {
                    if (focusedNaviButton.id === "home" || focusedNaviButton.id === "contact") return;
                    
                    const naviContent = naviMap.get(naviButton.id);
                    const closeButton = naviContent.querySelector('.close-button');
                    
                    if (closeButton) {
                        closeButton.click();
                        updateUrlByID(naviButton.id);
                    }
                    
                    return;
                }

                ShowNaviContent(naviButton);
                updateUrlByID(focusedNaviButton.id);
            });
        });
        
        if (hashID)
        {
            if (naviMap.get(hashID))
            {
                const naviButton = document.getElementById(hashID);
                ShowNaviContent(naviButton);
            }
        }
        else
        {
            highlightNaviButton(focusedNaviButton);
        }
    }
}

function highlightNaviButton(naviButton)
{
    naviButton.classList.add('navi-button-focused');
    naviButton.querySelectorAll('span').forEach(element => {
        element.classList.add('focused');
    });
}

function ShowNaviContent(naviButton)
{
    focusedNaviButton.classList.remove('navi-button-focused');
    focusedNaviButton.querySelectorAll('span').forEach(element => {
        element.classList.remove('focused');
    });
    focusedNaviButton = naviButton;

    highlightNaviButton(naviButton);

    shownContentContainer.style.display = "none";
    shownContentContainer = naviMap.get(naviButton.id);
    shownContentContainer.style.display = "flex";
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
        sideBar.classList.add('closed');
    } else {
        sideBar.classList.remove('closed');
    }
}

function initializeSidebarToggle() {
    const SIDEBAR_TOGGLE = document.getElementById('sidebar-toggle');
    SIDEBAR_TOGGLE.addEventListener('click', () => {
        sideBar.classList.toggle('closed');

        if (sideBar.classList.contains('closed')) {
            localStorage.setItem('sidebar-style', 'closed');
        } else {
            localStorage.setItem('sidebar-style', 'open');
        }
    });

    const SEARCH_BOX = document.getElementById('sidebar-search-box');
    SEARCH_BOX.addEventListener('click', () => {
        sideBar.classList.remove('closed');

        if (sideBar.classList.contains('closed')) {
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

function initializeCopyrightInfo() {
    const PROJECT_START_YEAR = 2024;
    const CURRENT_YEAR = new Date().getFullYear();
    const CURRENT_YEAR_TEXT = document.getElementById('current-year');
    CURRENT_YEAR_TEXT.textContent = CURRENT_YEAR === PROJECT_START_YEAR ? CURRENT_YEAR.toString() : `${PROJECT_START_YEAR} - ${CURRENT_YEAR}`;
}

function generateArticleList(directoryPath, listContainer, articleContainer) {
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
    
    function convertMarkDown(contentContainer, markdownContent) {
        const converter = new showdown.Converter();
        converter.setOption("disableForced4SpacesIndentedSublists", true);
        contentContainer.innerHTML = converter.makeHtml(markdownContent);
    }
    
    const articleList = listContainer.querySelector('.article-list');
    const articleContentContainer = articleContainer.querySelector('.article-content-container');

    fetchAllFilesInDirectory(directoryPath).then(files => {
        const sortedFiles = sortByUpdateDateAndIndex(files);

        sortedFiles.forEach(file => {
            const article = document.createElement('li');
            const articleIcon = document.createElement('i');
            const articleLink = document.createElement('a');
            const articleUpdateDate = document.createElement('span');
            const articleID = `${file.updateDate}_${file.index}`;
            
            article.id =  articleID;
            
            articleIcon.classList.add('fa-solid');
            
            articleLink.textContent = file.name;
            articleLink.href = `#${directoryPath}/${file.sha}`;
            articleLink.addEventListener('click', () => {
                ShowArticleContent();
            });

            articleUpdateDate.textContent = file.updateDate;
            
            article.appendChild(articleIcon);
            article.appendChild(articleLink);
            article.appendChild(articleUpdateDate);
            
            articleList.appendChild(article);
            
            if (hashID && hashID === articleID) 
            {
                ShowArticleContent();
                const naviButtonID = getKeyByValue(naviMap, shownContentContainer);
                const naviButton = document.getElementById(naviButtonID);
                highlightNaviButton(naviButton);
            }
            
            function ShowArticleContent()
            {
                shownContentContainer.style.display = 'none';
                shownContentContainer = articleContainer.parentElement.parentElement;
                shownContentContainer.style.display = 'flex';
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
            }
        });
    })
}

// function sidebarSearch() {
//
// }