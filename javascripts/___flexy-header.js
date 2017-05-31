/**
* Flexy header
*/
function getOffsetFromElementBottom($element) {
	var elementHeight = $element.outerHeight(true),
		elementOffset = $element.offset().top;

	return (elementHeight + elementOffset);
}

var $wrapper = $('.layout__wrapper'),
	$headerStatic = $('.flexy-header--static'),
	$headerSticky = $('.flexy-header--sticky'),
	options = {
		update_interval: 100,
		tolerance: {
			upward: 20,
			downward: 10
		},
		offset: getOffsetFromElementBottom($headerStatic),
		classes: {
			pinned: "flexy-header--pinned",
			unpinned: "flexy-header--unpinned"
		}
	},
	wasScrolled = false,
	lastScrollTop = 0;

$headerSticky.addClass(options.classes.unpinned);

$(window).scroll(function(event) {
	wasScrolled = true;
});

setInterval(function() {

	if (wasScrolled) {
		documentWasScrolled();

		wasScrolled = false;
	}
}, options.update_interval);

function documentWasScrolled() {
	var currentScrollTop = $(this).scrollTop();

    // If past offset
	if (currentScrollTop >= options.offset) {

		// Downwards scroll
		if (currentScrollTop > lastScrollTop) {

			// Obey the downward tolerance
		    if(Math.abs(currentScrollTop - lastScrollTop) <= options.tolerance.downward) {
		        return;
		    }

			$headerSticky.removeClass(options.classes.pinned).addClass(options.classes.unpinned);
		}

		// Upwards scroll
		else {

			// Obey the upward tolerance
		    if(Math.abs(currentScrollTop - lastScrollTop) <= options.tolerance.upward) {
		        return;
		    }

		    // We are not scrolled past the document which is possible on the Mac
			if ((currentScrollTop + $(window).height()) < $(document).height()) {
				$headerSticky.removeClass(options.classes.unpinned).addClass(options.classes.pinned);
			}
		}
	}

	// Not past offset
	else {
		$headerSticky.removeClass(options.classes.pinned).addClass(options.classes.unpinned);
	}

	lastScrollTop = currentScrollTop;
}
