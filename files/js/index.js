const SIDEBAR = document.getElementById('sidebar');
const CONTENT_CONTAINER = document.getElementById('content-container');

initializeTheme();
initializeSidebarStyle();
initializeSidebarToggle();
initializeDisplayModeToggle();
initializeIconLinks();
initializeNaviButtons();
initializeDefaultContent();
SetCurrentYear();

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
    const naviButtons = document.querySelectorAll('.navi-button');
    const naviButtonContainer = document.getElementById('navi-button-container');

    naviButtons.forEach(naviButton => 
    {
        naviButton.addEventListener('click', () => 
        {
            const focusedNaviButton = naviButtonContainer.querySelector('.navi-button-focused');
            focusedNaviButton?.classList.remove('navi-button-focused');
            focusedNaviButton?.querySelectorAll('span').forEach(element =>
            {
                element.classList.remove('focused');
            })

            naviButton.classList.add('navi-button-focused');
            naviButton.querySelectorAll('span').forEach(element =>
            {
                element.classList.add('focused');
            })

            const id = naviButton.id;

            switch (id) 
            {
                case 'navi-home':
                    getHtmlContent('files/html/home.html');
                    break;
                case 'navi-games':
                    getHtmlContent('files/html/games.html');
                    break;
                case 'navi-tutorials':
                    getHtmlContent('files/html/tutorials.html');
                    break;
                case 'navi-blogs':
                    getHtmlContent('files/html/blogList.html');
                    break;
                case 'navi-contact':
                    getHtmlContent('files/html/contact.html');
                    break;
                default:
                    CONTENT_CONTAINER.innerHTML  = '';
            }
        });
    });
}

function initializeDefaultContent()
{
    getHtmlContent('files/html/home.html');
}

function getHtmlContent(path)
{
    fetch(path)
        .then(response => response.text())
        .then(htmlContent => 
        {
            CONTENT_CONTAINER.innerHTML = htmlContent;
        });
}