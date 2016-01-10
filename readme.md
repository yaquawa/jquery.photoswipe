This is a jQuery plugin for the [PhotoSwipe](http://photoswipe.com/) that allow you to setup PhotoSwipe with just a few code.


# Usage

## Step 1. Include JS and CSS files
The CSS files are provided by [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe), you can find them in the [dist](https://github.com/dimsemenov/PhotoSwipe/tree/master/dist) folder of PhotoSwipe's GitHub repository.

Note that this plugin already included the PhotoSwipe, so you don't have to include it yourself.   
Also, you can access the `PhotoSwipe` class by referring `$.fn.photoSwipe.PhotoSwipe`.

```html
<!-- CSS file -->
<link rel="stylesheet" href="path/to/photoswipe.css">
<link rel="stylesheet" href="path/to/default-skin/default-skin.css">

<!-- JS file -->
<script src="path/to/jquery.photoswipe.js"></script>
```

The markup is something like this.

```html
<div id="gallery">
    <!-- 
    You can specify the following attribute for a img tag
    
      `data-original-src` : The url of original image 
      `data-original-src-width` : The width of original image 
      `data-original-src-height` : The height of original image
      `alt`: The caption text of this image.
    -->
    <img src="images/IMG_2969--thumbnail.jpg" data-original-src="images/IMG_2969.jpg" data-original-src-width="2000" data-original-src-height="2000" alt="caption text">

    <!-- 
    If the `data-original-src` not exists, `src` will be used. 
    If the `data-original-src-width` or `data-original-src-width` not exists, the natural width and height of this image will be used.
    -->
    <img src="images/IMG_3012.jpg">
</div>
```

## Step 2. Setup PhotoSwipe
Suppose you have the above markup, then just simply call the `photoSwipe()` method, you're done.

```js
$('#gallery').photoSwipe();
```

# Options
There are three parameters of the method `photoSwipe`.

### Syntax
`$gallery.photoSwipe(imgSelector, options, events);`

<dl>
 <dt><code>imgSelector</code></dt>
 <dd>The selector of img tags. The Default selector is <code>'img'</code></dd>
 <dt><code>options</code></dt>
 <dd>The <a href="http://photoswipe.com/documentation/options.html" target="_blank">options</a> passed to PhotoSwipe.</dd>
 <dt><code>events</code></dt>
 <dd>The <a href="http://photoswipe.com/documentation/api.html" target="_blank">events</a> passed to PhotoSwipe.</dd>
</dl>


Here is a sample code use all the three parameters.

```js
var imgSelector = 'img',
    options     = {bgOpacity: 0.8},
    events      = {
        close: function () {
            console.log('closed');
        }
    };

$('#gallery').photoSwipe(imgSelector, options, events);
```

# Update
After adding or removing slides dynamically, all you need to do is `$('#gallery').photoSwipe('update')`.

# ECMAScript 6
The source code is written in ECMAScript 6 (Browserify + Babelify), so you can easily import it by

```js
import 'jquery.photoswipe.js'
```

Also you should install it by `npm install jquery.photoswipe` .

Have fun!
