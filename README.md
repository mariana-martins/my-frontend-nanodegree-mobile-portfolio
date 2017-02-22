## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

### Getting started

####How to run

1. Check out the repository
1. To generate minified site, install gulp and minify project, using the following commands

  ```bash
  $> npm install gulp-cli -g
  $> npm install
  $> gulp minify
  ```

1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder/dist
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)
1. If you are having problems using ngrok, as performance issues or too many open connections, consider using [BitBalloon](www.bitballoon.com).  It is a free static web hosting that doesn't require to be registered to use.


####Part 1: Optimize PageSpeed Insights score for index.html

1. Run minified project using ngrok or BitBalloon (see previous section)
    1. If having performance problems, use BitBalloon or other similar solution. 
1. Access [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/).
1. Paste the project url on the related input and click on _Analyze_ button.

In order to optimize this page, and similar ones as _project-2048.html_, I did the following steps:

* Commented link to Google Fonts
* Optimized images manually, including compression and resizing
    * Gulp still optimize them but my manual optimization got better results
    * _pizzeria.jpg_ was resized to this page.  I created a copy to be used on pizza.html, that is optimized to that page.
* Injected css on the related tags, using a Gulp plugin called gulp-inline-css
* HTML minified
* JS uglified
* Commented Google Analytics script
* Stored images from another domain locally

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, I modify views/js/main.js until your frames per second rate is 60 fps or higher. The following changes were coded. 

* Optimized images manually
    * Gulp still optimize them but my manual optimization got better results
    * *pizzeria_home.jpg* is based on _pizzeria.jpg_ but properly optimized to this page.
* Injected css on the page, but not in the tag, using Gulp Smoosher plugin.
* HTML minified
* JS uglified and injected on the page.
* Added metatags related to viewport.

Several modifications were done on the js code, as:

* Adjectives and nouns data now is stored on the script, avoiding creating it every _getAdj_ and _getNoun_ function call.   
* Changed all Math.round calls to parseInt.
* Removed capitalize function and used CSS text-transform.
* Several querySelectorAll calls were refactored to be executed only once in a function, instead of every use.
* Store all Math.sin calculations in a array on updatePositions function to avoid calculating it several times.

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>



