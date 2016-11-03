This is a jQuery plugin for the [PhotoSwipe](http://photoswipe.com/) that allow you to setup PhotoSwipe with just a few code.


# Usage

## Step 1. Include JS and CSS files
The CSS files are provided by [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe), you can find them in the [dist](https://github.com/dimsemenov/PhotoSwipe/tree/master/dist) folder of PhotoSwipe's GitHub repository.

Note that this plugin already included the PhotoSwipe, so you don't have to include it yourself.   
Also, you can access the `PhotoSwipe` class by referring `$.fn.photoSwipe.PhotoSwipe`.

I recommend that you install this plugin by NPM `npm install jquery.photoswipe`.

```html
<!-- CSS file -->
<link rel="stylesheet" href="path/to/photoswipe.css">
<link rel="stylesheet" href="path/to/default-skin/default-skin.css">

<!-- JS file -->
<script src="path/to/jquery.js"></script>
<script src="path/to/jquery.photoswipe-global.js"></script>
```

The markup is something like this.

```html
<div id="gallery">
    <!-- 
    You can specify the following attribute for a img tag
    
      `data-original-src` : The url of original image 
      `data-original-src-width` : The width of original image 
      `data-original-src-height` : The height of original image
      
      ** About the caption text **
      The plugin will try to find the caption text from:
      1. `data-caption-class` attribute
         The value is a class name that indicates the element which contains the caption text.
         
      2. `figcaption` element
         The `figcaption` element that resides inside a `figure` which contains the slide `img` element.
         
      3. `alt` attribute
         The `alt` attribute of the slide `img` element.
    -->
    <img src="images/IMG_2969--thumbnail.jpg" data-original-src="images/IMG_2969.jpg" data-original-src-width="2000" data-original-src-height="2000" alt="caption text">

    <!-- 
    If the `data-original-src` not exists, `src` will be used. 
    If the `data-original-src-width` or `data-original-src-width` not exists, the natural width and height of the `src` will be used.
    If the file name of `src` matches the pattern `/(\d+)[*×x](\d+)/` (e.g. images/IMG_3012-1200x800.jpg), the plugin will takes width and height from the file name.
    (That way you don't need to specify the `data-original-src-width` and `data-original-src-width`).
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
`$gallery.photoSwipe(slideSelector, options, events);`

<dl>
 <dt><code>slideSelector</code></dt>
 <dd>
 <p>The selector of slides, the default selector is <code>'img'</code>.</p>
 <p>Make sure you include a <code>img</code> tag inside of the selected element, or you can just use a "bare img tag" just like the above sample markup.</p>
 <p>If this selector indicates an <code>a</code> tag, the attribute <code>href</code> will be used as the "original image url" of that image.</p>
 <p>If this selector indicates an <code>a</code> tag, and the value of the attribute <code>href</code> begin with the <code>#</code> that point to an element, the inner html of the pointed element will be shown.</p>
 </dd>
 <dt><code>options</code></dt>
 <dd>The <a href="http://photoswipe.com/documentation/options.html" target="_blank">options</a> passed to PhotoSwipe.</dd>
 <dt><code>events</code></dt>
 <dd>The <a href="http://photoswipe.com/documentation/api.html" target="_blank">events</a> passed to PhotoSwipe.</dd>
</dl>


Here is a sample code use all the three parameters.

```js
var slideSelector = 'img',
    options     = {bgOpacity: 0.8},
    events      = {
        close: function () {
            console.log('closed');
        }
    };

$('#gallery').photoSwipe(slideSelector, options, events);
```

# Update gallery
After adding or removing slides of a gallery dynamically, all you need to do is `$('#gallery').photoSwipe('update')` to update the gallery.

# ECMAScript 6
The source code is written in ECMAScript 6 (Browserify + Babelify), so you can easily import it by

```js
import PhotoSwipeMounter from 'jquery.photoswipe';

PhotoSwipeMounter(jQuery); // mount this plugin into jQuery
```

Also you should install it by `npm install jquery.photoswipe`.

Have fun!!
