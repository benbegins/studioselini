<?php
// acf_to_rest_api : Enable the option show in rest
add_filter( 'acf/rest_api/field_settings/show_in_rest', '__return_true' );

/**
 * Cache endpoint 
 */
function wprc_add_acf_posts_endpoint( $allowed_endpoints ) {
    if ( ! isset( $allowed_endpoints[ 'bemy' ] ) || ! in_array( 'posts', $allowed_endpoints[ 'bemy' ] ) ) {
        $allowed_endpoints[ 'bemy' ][] = 'reviews';
    }
    return $allowed_endpoints;
}
add_filter( 'wp_rest_cache/allowed_endpoints', 'wprc_add_acf_posts_endpoint', 10, 1);



/**
 * Endpoints 
 */
add_action( 'rest_api_init', 'register_reviews_route' );
function register_reviews_route() {
    // Google API - Reviews
    register_rest_route( 'bemy', '/reviews', array(
        'methods' => 'GET',
        'callback' => 'get_reviews',
    ) );
    // Planning
    register_rest_route( 'bemy', '/planning', array(
        'methods' => 'GET',
        'callback' => 'get_planning',
    ) );
    // Contact
    register_rest_route( 'bemy', '/contact', array(
        'methods' => 'POST',
        'callback' => 'send_email',
        'args' => array(
            'name' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return is_string($param);
                }
            ),
            'email' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return is_email($param);
                }
            ),
            'message' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    return is_string($param);
                }
            ),
            'g-recaptcha-response' => array(
                'required' => true,
                'validate_callback' => function($param, $request, $key) {
                    $url = 'https://www.google.com/recaptcha/api/siteverify';
                    $data = array(
                        'secret' => GOOGLE_RECAPTCHA_SECRET_KEY,
                        'response' => $param,
                    );
                    $options = array(
                        'body' => $data,
                    );
                    $response = wp_remote_post($url, $options);
                    $body = wp_remote_retrieve_body($response);
                    $result = json_decode($body);
                    return $result->success;
                }
            ),
        ),
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

function get_planning(){
    // get posttype course
    $args = array(
        'post_type' => 'course',
        'posts_per_page' => -1,
    );
    $courses = get_posts($args);

    $planning = array();
    // Add an empty array for each day inside $planning
    for ($i = 0; $i < 7; $i++) {
        $planning[] = array();
    }


    foreach ($courses as $key => $course) {
        // Get planning of each course
        $week_sessions = get_field('planning', $course->ID);

        // For each day of the week get the sessions
        foreach ($week_sessions as $key => $day_sessions) {
            // Get day
            $day = $key;
            // Skip if no sessions
            if (empty($day_sessions['day'])) {
                continue;
            }

            foreach ($day_sessions['day'] as $session){
                // Get teachers
                $teachers = '';
                foreach($session['teacher'] as $key => $teacher){
                    if($key < count($session['teacher']) - 1){
                        $teachers = $teachers . $teacher->post_title . ', ';
                    } else {
                        $teachers = $teachers . $teacher->post_title;
                    }
                }
                // Add to planning
                $planning[$day][] = array(
                    'day' => $day,
                    'course' => $course->post_title,
                    'color' => get_field('color', $course->ID),
                    'start_time' => $session['start_time'],
                    'duration' => $session['duration'],
                    'start_position' => date('H', strtotime($session['start_time'])) - 7,
                    'end_time' => date('H:i', strtotime($session['start_time']) + ($session['duration'] * 60)),
                    'level' => $session['level'],
                    'teacher' => $teachers,
                );  
           
                // in each $planning[$day], sort by start_time
                usort($planning[$day], function($a, $b) {
                    return $a['start_time'] <=> $b['start_time'];
                });
            }
        }
    }
    return $planning;
}


function send_email($request) {
    $name = sanitize_text_field( $request['name'] );
    $email = sanitize_email( $request['email'] );
    $message = sanitize_textarea_field( $request['message'] );

    // Get the email address from the options page
    // $email_selini = get_field('email', 'options');
    $email_selini = "benoit.beghyn@gmail.com";

    $to = $email_selini;
    $subject = 'Nouveau message de ' . $name . ' via le site Studio Selini';
    $body = 'Nom : ' . $name . "\n";
    $body .= 'Email : ' . $email . "\n";
    $body .= 'Message : ' . $message . "\n";

    $headers = array(
        'From: ' . $name . ' <' . $email . '>',
        'Replay-To: ' . $email,
        'Content-Type: text/html; charset=UTF-8'
    );

    wp_mail($to, $subject, $body, $headers);
    
    return new WP_REST_Response( array( 
        'success' => true, 
        'message' => 'Votre message a bien été envoyé.' ,
    ), 200 );
}