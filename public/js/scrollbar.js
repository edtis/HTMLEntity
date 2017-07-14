// JavaScript Document

// JavaScript Document

(function($){
	'use strict';
	$(window).on("load",function(){
		$('[data-toggle="tooltip"]').tooltip();
		// console.log("loaded");			
				var $main = $('main');
				$.mCustomScrollbar.defaults.scrollButtons.enable=true; //enable scrolling buttons by default
				$main.mCustomScrollbar({
					theme:"rounded-dots-dark",
					scrollInertia:1000,
					autoHideScrollbar: true,
					mouseWheel:{ scrollAmount: 500 },
					alwaysShowScrollbar: 1
					});

					$("a.navigation").on('click', function(){
							var id = this.getAttribute("id");
							$main.mCustomScrollbar("scrollTo", id, {
								scrollEasing:"easeOut",
								scrollInertia:1500
							});
						});


			});
})(jQuery);
