
import { WeatherNewsModel } from "./wn_model.js";
import { WeatherNewsView } from "./wn_view.js";
import { WeatherNewsController } from "./wn_controller.js";

let wn_model = new WeatherNewsModel();
let wn_view = new WeatherNewsView();
let wn_controller = new WeatherNewsController(wn_model, wn_view);

wn_controller.initialize();
