<?php
// acf_to_rest_api : Enable the option show in rest
add_filter( 'acf/rest_api/field_settings/show_in_rest', '__return_true' );

// Create a custom endpoint to get reviews from Google API
add_action( 'rest_api_init', 'register_reviews_route' );
function register_reviews_route() {
    register_rest_route( 'bemy', '/reviews', array(
        'methods' => 'GET',
        'callback' => 'get_reviews',
    ) );
}

function get_reviews() {
    $place_id = STUDIO_SELINE_PLACE_ID;
    $api_key = GOOGLE_API_KEY;
    $url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=$place_id&fields=reviews&key=$api_key&language=fr";
    $response = wp_remote_get( $url );
    $body = wp_remote_retrieve_body( $response );
    return json_decode( $body );
}