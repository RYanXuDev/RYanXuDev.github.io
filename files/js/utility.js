export function updateUrlByID(id)
{
    const currentUrl = window.location.href;
    const newUrl = currentUrl.split('#')[0] + "#" + id;
    history.pushState({ url: newUrl }, null, newUrl);
}

export function getKeyByValue(map, searchValue)
{
    for (let [key, value] of map.entries())
    {
        if (value === searchValue)
        {
            return key;
        }
    }

    return null;
}