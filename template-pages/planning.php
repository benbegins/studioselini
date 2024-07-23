<?php

/*
  Template Name: Planning
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;

 Timber::render( 'pages/planning.twig', $context ); 