function parseFileName(fileName) {
    const regex = /^(.+)\.(\d{4}-\d{2}-\d{2})\.(\d{2})\.(\w+)$/;
    const match = fileName.match(regex);

    if (match) {
        const realName = match[1];
        const updateDate = match[2];
        const index = match[3];
        const extension = match[4];

        return {
            realName: realName,
            updateDate: updateDate,
            index: index,
            extension: extension,
        };
    } else {
        console.error(`File [${fileName}] naming format not match...`);
        return {};
    }
}

export function fetchAllFilesInDirectory(directoryPath) {

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
                        sha: file.sha,
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