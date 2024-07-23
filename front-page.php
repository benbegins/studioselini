<?php
$context = Timber::context();
$timber_post = new Timber\Post();

$context['post'] = $timber_post;

// Get the studio page
$args = array(
    'post_type' => 'page',
    'meta_key' => '_wp_page_template',
    'meta_value' => 'template-pages/studio.php'
);
$studio = get_pages($args)[0];
$context['studio_page_url'] = get_permalink($studio->ID);



Timber::render( 'pages/home.twig', $context );