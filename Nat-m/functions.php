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



add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');

function load_more_photos() {
    
    if (!isset($_REQUEST['nonce']) || !wp_verify_nonce($_REQUEST['nonce'], 'load_more_photos')) {
        wp_send_json_error("Vous n’avez pas l’autorisation d’effectuer cette action.", 403);
    }

   
    if (!isset($_POST['page'])) {
        wp_send_json_error("Le numéro de page est manquant.", 400);
    }

    
    $page = intval($_POST['page']);
    $order = isset($_POST['order']) ? sanitize_text_field($_POST['order']) : 'DESC';

    
    $args = array(
        'post_type' => 'photo',
        'paged' => $page,
        'posts_per_page' => 8,
        'order' => $order
    );

    
    $query = new WP_Query($args);

    ob_start();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('templates_parts/photo_block');
        }
    }

    $output = ob_get_contents();
    ob_end_clean();

    $args['paged'] = $page + 1;
    $query = new WP_Query($args);
    $post_next_page = $query->have_posts();

    wp_send_json_success(array('html' => $output, 'post_next_page' => $post_next_page));
}
