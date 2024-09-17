<?php

if ( ! function_exists( 'bemy_scripts' ) ) {
	function bemy_scripts() {

		wp_deregister_script( 'jquery' );

		// Style
		wp_enqueue_style( 'fonts', 'https://use.typekit.net/ggh8bso.css', array(), null, 'all' );
		wp_enqueue_style( 'bemy-css', get_template_directory_uri() . '/dist/style.css', array(), '1.0.1' );
		wp_enqueue_script( 'axios', "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", array(), false, true );
		wp_enqueue_script( 'bemy-script', get_template_directory_uri() . '/dist/init.js', array('axios'), '1.0.1', true );
		if ( is_page_template( 'template-pages/contact.php' ) ) {
			wp_enqueue_script( 'recaptcha', 'https://www.google.com/recaptcha/enterprise.js?render=6LfFYSoqAAAAAO8sSeoW3Qjp_d6PgLGonuDKBRNw', array(), false, true );
		}

		// Remove gutenberg css
		wp_dequeue_style( 'wp-block-library' );

		// Remove wp-embed script
		wp_deregister_script( 'wp-embed' );
	}
}
add_action( 'wp_enqueue_scripts', 'bemy_scripts' );

// Admin script
function admin_scripts(){
	wp_enqueue_script( 'bemy-admin-script', get_template_directory_uri() . '/dist/admin.js', array(), false, true );
	wp_enqueue_style( 'bemy-admin-style', get_template_directory_uri() . '/src/styles/admin.css', array(), null, 'all' );
}
add_action( 'admin_enqueue_scripts', 'admin_scripts' );



if ( ! function_exists( 'bemy_disable_emoji_feature' ) ) {
	function bemy_disable_emoji_feature() {

		// Prevent Emoji from loading on the front-end
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );

		// Remove from admin area also
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );

		// Remove from RSS feeds also
		remove_filter( 'the_content_feed', 'wp_staticize_emoji');
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji');

		// Remove from Embeds
		remove_filter( 'embed_head', 'print_emoji_detection_script' );

		// Remove from emails
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );

		// Disable from TinyMCE editor. Currently disabled in block editor by default
		add_filter( 'tiny_mce_plugins', 'bemy_disable_emojis_tinymce' );

		/** Finally, prevent character conversion too
			 ** without this, emojis still work
			** if it is available on the user's device
		*/

		add_filter( 'option_use_smilies', '__return_false' );

	}
}

if ( ! function_exists( 'bemy_disable_emojis_tinymce' ) ) {

	function bemy_disable_emojis_tinymce( $plugins ) {
		if( is_array($plugins) ) {
			$plugins = array_diff( $plugins, array( 'wpemoji' ) );
		}
		return $plugins;
	}
}

add_action('init', 'bemy_disable_emoji_feature');