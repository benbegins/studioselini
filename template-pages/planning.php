<?php

/*
  Template Name: Planning
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;

 // Get permalink of the page with template "cours"
$args = array(
  'post_type' => 'page',
  'meta_key' => '_wp_page_template',
  'meta_value' => 'template-pages/cours.php'
);
$cours_page = get_pages($args)[0];
$context['cours_page_url'] = get_permalink($cours_page->ID);

// Get permalink of the page with template "tarifs"
$args = array(
  'post_type' => 'page',
  'meta_key' => '_wp_page_template',
  'meta_value' => 'template-pages/tarifs.php'
);
$tarifs_page = get_pages($args)[0];
$context['tarifs_page_url'] = get_permalink($tarifs_page->ID);

 Timber::render( 'pages/planning.twig', $context ); 