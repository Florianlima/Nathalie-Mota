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

add_action('init', 'register_my_menus');

function theme_enqueue_styles() {
    
    wp_enqueue_style('style', get_stylesheet_directory_uri() . '/style.css');
}




// Enregistrement des scripts
wp_enqueue_script('jquery');
wp_enqueue_script('script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('jquery'), '1.0.0', true);

add_action('wp_enqueue_scripts', 'theme_enqueue_styles');



include get_template_directory() . "/ajax.php" ;