export class WeatherNewsView {
    constructor() {
        this.weatherBtn = document.getElementById('weatherBtn');
        this.newsBtn = document.getElementById('newsBtn');
        this.weatherInput = document.getElementById('cityInput');
        this.newsInput = document.getElementById('newsQuery');
        this.weatherResult = document.getElementById('weatherResult');
        this.newsResult = document.getElementById('newsResult');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.weatherBtn.addEventListener('click', () => {
            let city = this.weatherInput.value;
            if (this.onWeatherRequest) {
                this.onWeatherRequest(city);
            }
        });

        this.newsBtn.addEventListener('click', () => {
            let query = this.newsInput.value;
            if (this.onNewsRequest) {
                this.onNewsRequest(query);    
            }
        });
    }

    displayWeather(weather) {
        this.weatherResult.innerHTML = `
            <div class="weather-box">
                The weather in ${weather.city} is ${weather.condition.toLowerCase()}.
            </div>
        `;
    }
    

    displayNews(articles) {
        this.newsResult.innerHTML = articles.slice(0, 10).map(article => `
            <div class="news-box">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
            </div>
        `).join('');
    }
    
}
