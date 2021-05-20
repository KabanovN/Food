    // функция отправки данных на сервер
    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return result.json();
    };

    // функция получения ответа с сервера
    const getResourses = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status ${result.status}`);
        }

        return await result.json();
    };

    export {postData};
    export {getResourses};