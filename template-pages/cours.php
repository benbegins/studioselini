<?php

/*
  Template Name: Cours
  Template Post Type: page
 */
    
 $context = Timber::context();


//  Get post type "course"
$context['courses'] = Timber::get_posts( array(
  'post_type' => 'course',
  'posts_per_page' => -1,
) );

 Timber::render( 'pages/cours.twig', $context ); 