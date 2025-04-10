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
  'order' => 'ASC',
  'meta_query' => array(
    array(
      'key' => 'date',
      'value' => date('Y-m-d'),
      'compare' => '>',
      'type' => 'DATE'
    )
  )
));


 Timber::render( 'pages/ateliers.twig', $context ); 