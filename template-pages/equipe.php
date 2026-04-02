<?php

/*
  Template Name: Equipe
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


 Timber::render( 'pages/equipe.twig', $context ); 