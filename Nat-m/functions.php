<?php
// Fonction pour enregistrer les emplacements de menu//
function register_my_menus() {
    register_nav_menus(
        array(
            'primary' => __( 'Menu principal' ),
            'footer' => __( 'Menu du pied de page' )
        )
    );
}

// Appele la fonction pour enregistrer les menus//
add_action('init', 'register_my_menus');

function theme_enqueue_styles() {
    // Enregistrement du style
    wp_enqueue_style('style', get_stylesheet_directory_uri() . '/style.css');
}

add_action('wp_enqueue_scripts', 'theme_enqueue_styles');


// Enregistrement des scripts
wp_enqueue_script('jquery'); // /jQuery est inclus en premier//
wp_enqueue_script('script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('jquery'), '1.0.0', true);


