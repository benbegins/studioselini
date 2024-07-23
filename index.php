<?php

$context          = Timber::context();
$context['posts'] = new Timber\PostQuery();



Timber::render( 'pages/home.twig', $context );
