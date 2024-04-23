
export class WeatherNewsController {
    #model;
    #view;

    constructor(model, view) {
        this.#model = model;
        this.#view = view;

        this.#model.addEventListener('weather_update', (event) => {
            this.#view.displayWeather(event.detail);
        });

        this.#model.addEventListener('news_update', (event) => {
            this.#view.displayNews(event.detail);
        });

        this.#view.onWeatherRequest = (city) => this.#model.updateWeather(city);
        this.#view.onNewsRequest = (query) => this.#model.updateNews(query);
    }

    initialize() {
        console.log('Controller initialized');
    }
}

