<?php

/*
  Template Name: Studio
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;

 Timber::render( 'pages/studio.twig', $context ); 