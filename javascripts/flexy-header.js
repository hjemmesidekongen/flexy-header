// |--------------------------------------------------------------------------
// | Flexy header
// |--------------------------------------------------------------------------
// |
// | This jQuery script is written by
// |
// | Morten Nissen
// | hjemmesidekongen.dk
// |

var flexy_header = (function ($) {
    'use strict';

    var pub = {},
        $header_static = $('.flexy-header--static'),
        $header_sticky = $('.flexy-header--sticky'),
        options = {
            update_interval: 100,
            tolerance: {
                upward: 20,
                downward: 10
            },
            offset: _get_offset_from_elements_bottom($header_static),
            classes: {
                pinned: "flexy-header--pinned",
                unpinned: "flexy-header--unpinned"
            }
        },
        was_scrolled = false,
        last_distance_from_top = 0;

    /**
     * Instantiate
     */
    pub.init = function (options) {
        registerEventHandlers();
        registerBootEventHandlers();
    };

    /**
     * Register boot event handlers
     */
    function registerBootEventHandlers() {
        $header_sticky.addClass(options.classes.unpinned);

        setInterval(function() {

            if (was_scrolled) {
                document_was_scrolled();

                was_scrolled = false;
            }
        }, options.update_interval);
    }

    /**
     * Register event handlers
     */
    function registerEventHandlers() {
        $(window).scroll(function(event) {
            was_scrolled = true;
        });
    }

    /**
     * Get offset from element bottom
     */
    function _get_offset_from_elements_bottom($element) {
        var element_height = $element.outerHeight(true),
            element_offset = $element.offset().top;

        return (element_height + element_offset);
    }

    /**
     * Document was scrolled
     */
    function document_was_scrolled() {
        var current_distance_from_top = $(window).scrollTop();

        // If past offset
        if (current_distance_from_top >= options.offset) {

            // Downwards scroll
            if (current_distance_from_top > last_distance_from_top) {

                // Obey the downward tolerance
                if (Math.abs(current_distance_from_top - last_distance_from_top) <= options.tolerance.downward) {
                    return;
                }

                $header_sticky.removeClass(options.classes.pinned).addClass(options.classes.unpinned);
            }

            // Upwards scroll
            else {

                // Obey the upward tolerance
                if (Math.abs(current_distance_from_top - last_distance_from_top) <= options.tolerance.upward) {
                    return;
                }

                // We are not scrolled past the document which is possible on the Mac
                if ((current_distance_from_top + $(window).height()) < $(document).height()) {
                    $header_sticky.removeClass(options.classes.unpinned).addClass(options.classes.pinned);
                }
            }
        }

        // Not past offset
        else {
            $header_sticky.removeClass(options.classes.pinned).addClass(options.classes.unpinned);
        }

        last_distance_from_top = current_distance_from_top;
    }

    return pub;
})(jQuery);
