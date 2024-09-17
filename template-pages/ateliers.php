<?php

/*
  Template Name: Ateliers
  Template Post Type: page
 */
    
 $context = Timber::context();


//  Get post type "course"
$context['workshops'] = Timber::get_posts( array(
  'post_type' => 'workshop',
  'posts_per_page' => -1,
  'meta_key' => 'date',
  'orderby' => 'meta_value',
  'order' => 'ASC'
) );

// Get permalink of the page with template "studio"
$args = array(
  'post_type' => 'page',
  'meta_key' => '_wp_page_template',
  'meta_value' => 'template-pages/studio.php'
);
$studio_page = get_pages($args)[0];
$context['studio_page_url'] = get_permalink($studio_page->ID);

 Timber::render( 'pages/ateliers.twig', $context ); 