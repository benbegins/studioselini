<?php

/**
 *  Remove comments and articles from admin menu
*/  
function post_remove (){ 
    remove_menu_page( 'edit-comments.php' );
    remove_menu_page( 'edit.php' );
}
add_action('admin_menu', 'post_remove'); 



/**
 *  Remove editor support for pages
*/
function remove_editor() {
  // Vérifier si on est sur l'éditeur de pages (côté admin)
  if ( ! is_admin() ) {
    return;
}

// Récupérer le type de post (page, post, etc.)
$post_id = isset($_GET['post']) ? $_GET['post'] : (isset($_POST['post_ID']) ? $_POST['post_ID'] : null);
if ( ! $post_id ) {
    return;
}


  // Récupérer le modèle de page utilisé
  $template_file = get_post_meta($post_id, '_wp_page_template', true);

  // Liste des modèles de page pour lesquels on souhaite désactiver l'éditeur
  $templates_to_disable_editor = array(
      'template-pages/ateliers.php',
      'template-pages/contact.php',
      'template-pages/cours.php',
      'template-pages/planning.php',
      'template-pages/studio.php',
      'template-pages/tarifs.php',
  );

  // Vérifier si la page en cours est définie comme page d'accueil
  $is_front_page = ( $post_id == get_option('page_on_front') );

  // Si le modèle de page est dans la liste ou si c'est la page d'accueil, on désactive l'éditeur
  if ( $is_front_page || in_array( $template_file, $templates_to_disable_editor ) ) {
      remove_post_type_support( 'page', 'editor' );
  }
}
add_action('admin_init', 'remove_editor');

