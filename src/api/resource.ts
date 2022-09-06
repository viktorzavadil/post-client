export default class Resource {

    constructor(private url: URL) {
    }

    find() {
        return fetch(this.url.toString())
            .then((result) => {
                return result.json();
            });
    }
}
