<?php

/*
  Template Name: Tarifs
  Template Post Type: page
 */
    
 $context = Timber::context();

 $timber_post     = new Timber\Post();
 $context['post'] = $timber_post;


// Get permalink of the page with template "contact"
$args = array(
  'post_type' => 'page',
  'meta_key' => '_wp_page_template',
  'meta_value' => 'template-pages/contact.php'
);
$contact_page = get_pages($args)[0];
$context['contact_page_url'] = get_permalink($contact_page->ID);

// Get permalink of the page with template "planning"
$args = array(
  'post_type' => 'page',
  'meta_key' => '_wp_page_template',
  'meta_value' => 'template-pages/planning.php'
);
$planning_page = get_pages($args)[0];
$context['planning_page_url'] = get_permalink($planning_page->ID);


 Timber::render( 'pages/tarifs.twig', $context ); 