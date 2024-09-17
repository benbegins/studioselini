<?php

/*
  Template Name: Studio
  Template Post Type: page
 */
    
 $context = Timber::context();

//  Get post type "teacher"
  $context['teachers'] = Timber::get_posts( array(
      'post_type' => 'teacher',
      'posts_per_page' => -1,
      'orderby' => 'title',
      'order' => 'ASC'
  ) );

// Get permalink of the page with template "planning"
$args = array(
  'post_type' => 'page',
  'meta_key' => '_wp_page_template',
  'meta_value' => 'template-pages/planning.php'
);
$planning_page = get_pages($args)[0];
$context['planning_page_url'] = get_permalink($planning_page->ID);

 Timber::render( 'pages/studio.twig', $context ); 