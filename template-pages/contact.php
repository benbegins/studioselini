<?php

/*
  Template Name: Contact
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;


// Get permalink of the page with template "studio"
$args = array(
  'post_type' => 'page',
  'meta_key' => '_wp_page_template',
  'meta_value' => 'template-pages/studio.php'
);
$studio_page = get_pages($args)[0];
$context['studio_page_url'] = get_permalink($studio_page->ID);


 Timber::render( 'pages/contact.twig', $context ); 