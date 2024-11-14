<?php
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
