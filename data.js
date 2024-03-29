class Data {

    static async sendResponse(body) {
        const url = 'https://api.text.ru/post';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
              },
        });

        const data = await response.json();

        return data;
    }

}

module.exports = Data