<?php

$context          = Timber::context();
$context['posts'] = new Timber\PostQuery();

Timber::render( 'pages/index.twig', $context );
