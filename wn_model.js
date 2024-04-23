let weatherApiKey = "eaf3948b5b66462d92341316241704";
let newsApiKey = "61a442d75cc043c0ae9cdcd1e04fc3da";

export class Weather {
    #data

    constructor(data) {
        this.#data = data;
    }

    get city() { return this.#data.location.name; }
    get condition() { return this.#data.current.condition.text; }
    get temperature() { return this.#data.current.temp_c; }

    static async getByCity(city) {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=no`);
        let weatherData = await response.json();
        return new Weather(weatherData);
    }
}

export class NewsArticle {
    #data

    constructor(data) {
        this.#data = data;
    }

    get title() { return this.#data.title; }
    get description() { return this.#data.description; }

    static async findByQuery(query) {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`);
        let newsData = await response.json();
        return newsData.articles.map(article => new NewsArticle(article));
    }
}

export class WeatherNewsModel extends EventTarget {
    #weather
    #articles

    constructor() {
        super();
        this.#weather = [];
        this.#articles = [];
    }

    async updateWeather(city) {
        let weather = await Weather.getByCity(city);
        this.#weather.push(weather);
        this.dispatchEvent(new CustomEvent('weather_update', { detail: weather }));
    }

    async updateNews(query) {
        let articles = await NewsArticle.findByQuery(query);
        this.#articles.push(...articles);
        this.dispatchEvent(new CustomEvent('news_update', { detail: articles }));
    }

    get weather() {
        return [...this.#weather];
    }

    get news() {
        return [...this.#articles];
    }
}
