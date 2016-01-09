var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */


elixir.config.assetsPath = 'src';
elixir.config.publicPath = 'dist';
elixir.config.js.folder = '';
elixir.config.js.outputFolder = '';

elixir(function (mix) {
    mix.browserify('jquery.photoswipe.js');
});
