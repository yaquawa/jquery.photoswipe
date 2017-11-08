import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from './libs/photoswipe-ui-default';


function PhotoSwipeMounter($) {
    var $defaultGallery = $('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>')
            .appendTo('body'),
        uid             = 1;

    function getImgs($gallery) {
        var slideSelector = getOptions($gallery).slideSelector;

        return $gallery.find(slideSelector).map(function (index) {
            var $img    = $(this).data('index', index),
                tagName = this.tagName.toUpperCase();

            if (tagName === 'A') {
                if (this.hash) {
                    $img = $(this.hash);
                } else {
                    $img = $img.find('img').eq(0);
                    $img.data('original-src', this.href);
                }
            }
            else if (tagName !== 'IMG') {
                $img = $img.find('img');
            }

            return $img[0];
        });
    }

    function getThumbBoundsFn($imgs) {
        return function _getThumbBoundsFn(index) {
            var $img      = $imgs.eq(index),
                imgOffset = $img.offset(),
                imgWidth  = $img[0].width;

            return {x: imgOffset.left, y: imgOffset.top, w: imgWidth};
        };
    }

    function getWH(wh, $img) {
        var d            = $.Deferred(),
            wh_value     = $img.data(`original-src-${wh}`),
            original_src = decodeURI($img.data('original-src') || $img.attr('src')),
            matches      = original_src.match(/(\d+)[*×x](\d+)/);

        if (wh_value) {
            d.resolve(wh_value);
        } else if (matches !== null) {
            d.resolve(matches[(wh === 'width' ? 1 : 2)]);
        } else {
            $(`<img>`).on('load', function () {
                d.resolve(this[wh]);
            }).attr('src', $img.attr('src'));
        }

        return d.promise();
    }

    function getHeight($img) {
        return getWH('height', $img);
    }

    function getWidth($img) {
        return getWH('width', $img);
    }

    function getImgSize($img) {
        return $.when(getWidth($img), getHeight($img));
    }

    function getImgInfo() {
        var $img         = $(this),
            original_src = $img.data('original-src') || $img.attr('src'),
            d            = $.Deferred();

        if (this.tagName !== 'IMG') {
            d.resolve({
                html: this.innerHTML
            });
        } else {
            getImgSize($img).done(function (w, h) {
                var src = $img.attr('src'),
                    title,
                    caption_classname,
                    $figcaption;

                function get_caption($elem, selector) {
                    var $parent = $elem.parent(),
                        $caption_element;

                    if (!$parent.length) {
                        return undefined;
                    }

                    $caption_element = $parent.find(selector);
                    if ($caption_element.length) {
                        return $caption_element.html();
                    }

                    return get_caption($parent, selector);
                }

                // try to find the slide title from :
                // (in order)
                //
                // 1. `data-caption-class` (a class-name that indicates the element containing the caption)
                // 2. `figcaption` element (the `figcaption` that resides inside a `figure` which contains the slide `img` element)
                // 3. `alt` attribute (the `alt` attribute of the slide `img` element)

                if (caption_classname = $img.data('caption-class')) {
                    title = get_caption($img, '.' + caption_classname);
                } else if (($figcaption = $img.closest('figure').find('figcaption')) && $figcaption.length) {
                    title = $figcaption.html();
                } else {
                    title = $img.attr('alt');
                }

                d.resolve({
                    w: w,
                    h: h,
                    src: original_src,
                    msrc: src,
                    title: title
                });
            });
        }


        return d.promise();
    }

    function getImgInfoArray($imgs) {
        var imgInfoArray = $imgs.map(getImgInfo).get(),
            d            = $.Deferred();

        $.when.apply($, imgInfoArray).done(function () {
            var imgInfoArray = Array.prototype.slice.call(arguments);
            d.resolve(imgInfoArray);
        });

        return d.promise();
    }

    function getOptions($gallery) {
        return $gallery.data('photoswipeOptions');
    }

    function addUID($gallery) {
        if (!$gallery.data('pswp-uid')) {
            $gallery.data('pswp-uid', uid++);
        }
    }

    function openPhotoSwipe(index, $gallery, $imgs, imgInfoArray) {
        var options    = $.extend(getOptions($gallery).globalOptions, {index: index, getThumbBoundsFn: getThumbBoundsFn($imgs), galleryUID: $gallery.data('pswp-uid')}),
            photoSwipe = new PhotoSwipe($defaultGallery[0], PhotoSwipeUI_Default, imgInfoArray, options);

        $.each(getOptions($gallery).events, function (eventName, eventHandler) {
            photoSwipe.listen(eventName, eventHandler);
        });

        photoSwipe.init();
    }

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    function photoswipeParseHash() {
        var hash   = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = parseInt(pair[1], 10);
        }

        return params;
    }

    function openFromURL($galleries) {
        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            let $gallery            = $galleries[hashData.gid - 1],
                pid                 = hashData.pid - 1,
                $imgs               = getImgs($gallery),
                imgInfoArrayPromise = getImgInfoArray($imgs);

            imgInfoArrayPromise.done(function (imgInfoArray) {
                openPhotoSwipe(pid, $gallery, $imgs, imgInfoArray);
            });
        }
    }

    function addClickHandler($gallery, $imgs, imgInfoArray) {
        $gallery.on('click.photoswipe', getOptions($gallery).slideSelector, function (e) {
            e.preventDefault();
            openPhotoSwipe($(this).data('index'), $gallery, $imgs, imgInfoArray);
        });
    }

    function removeClickHandler($gallery) {
        $gallery.off('click.photoswipe');
    }

    function update($gallery) {
        var $imgs               = getImgs($gallery),
            imgInfoArrayPromise = getImgInfoArray($imgs);

        imgInfoArrayPromise.done(function (imgInfoArray) {
            removeClickHandler($gallery);
            addClickHandler($gallery, $imgs, imgInfoArray);
        });
    }

    $.fn.photoSwipe = function (slideSelector = 'img', options = {}, events = {}) {
        var defaultOptions = {
                bgOpacity: 0.973,
                showHideOpacity: true
            },
            globalOptions  = $.extend(defaultOptions, options);


        // Initialize each gallery
        var $galleries = [],
            isUpdate   = slideSelector === 'update';

        this.each(function () {
            if (isUpdate) {
                update($(this));
                return;
            }

            var $gallery            = $(this).data('photoswipeOptions', {slideSelector: slideSelector, globalOptions: globalOptions, events: events}), // save options
                $imgs               = getImgs($gallery),
                imgInfoArrayPromise = getImgInfoArray($imgs);


            addUID($gallery);
            $galleries.push($gallery);


            imgInfoArrayPromise.done(function (imgInfoArray) {
                addClickHandler($gallery, $imgs, imgInfoArray);
            });
        });

        if (!isUpdate) {
            openFromURL($galleries);
        }

        return this;
    };

    // Attach original PhotoSwipe to $.fn.photoSwipe
    $.fn.photoSwipe.PhotoSwipe = PhotoSwipe;
}


/*
 <<<GLOBAL
 PhotoSwipeMounter(jQuery);
 GLOBAL;
 */


export {PhotoSwipeMounter as default, PhotoSwipe};
